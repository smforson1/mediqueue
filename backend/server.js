const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to map snake_case to camelCase for frontend
const mapToCamel = (obj) => {
  if (!obj) return null;
  const newObj = {};
  for (let key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    newObj[camelKey] = obj[key];
  }
  return newObj;
};

// --- API ROUTES ---

// 1. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json(mapToCamel({ ...userWithoutPassword, token: `mock-jwt-${user.role}` }));
  } else {
    res.status(401).json({ message: 'Invalid credentials or user not found' });
  }
});

// 1b. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  
  const { data: user, error } = await supabase
    .from('users')
    .insert([{ name, username: email, phone, password, role: 'patient' }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') return res.status(400).json({ message: 'Email already registered' });
    return res.status(500).json({ error: error.message });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(mapToCamel({ ...userWithoutPassword, token: 'mock-jwt-patient' }));
});

// 1c. Auth: Forgot Password (send reset link)
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  // Check user exists
  const { data: user } = await supabase
    .from('users')
    .select('id, name, username')
    .eq('username', email)
    .single();

  // Always respond OK to prevent email enumeration
  if (!user) return res.json({ message: 'If that email is registered, a reset link was sent.' });

  // Generate a simple token and store it
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1 hour

  await supabase
    .from('users')
    .update({ reset_token: token, reset_token_expires: expiresAt })
    .eq('id', user.id);

  // In real app: send email with link → /reset-password?token=<token>
  // For demo, log to console so developer can test
  console.log(`[RESET] Link for ${email}: http://localhost:5173/reset-password?token=${token}`);

  res.json({ message: 'If that email is registered, a reset link was sent.' });
});

// 1d. Auth: Reset Password (set new password)
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required.' });

  const { data: user } = await supabase
    .from('users')
    .select('id, reset_token_expires')
    .eq('reset_token', token)
    .single();

  if (!user) return res.status(400).json({ message: 'Invalid or expired reset link.' });
  if (new Date(user.reset_token_expires) < new Date()) {
    return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
  }

  await supabase
    .from('users')
    .update({ password: newPassword, reset_token: null, reset_token_expires: null })
    .eq('id', user.id);

  res.json({ message: 'Password updated successfully.' });
});

// 2. Doctors: List all
app.get('/api/doctors', async (req, res) => {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) return res.status(500).json({ error: error.message });
  res.json((data || []).map(mapToCamel));
});

// 2b. Doctors: Update Schedule
app.patch('/api/doctors/:id', async (req, res) => {
  const { available_days } = req.body;
  const { data, error } = await supabase
    .from('doctors')
    .update({ available_days })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(mapToCamel(data));
});

// 3. Appointments: List with filters
app.get('/api/appointments', async (req, res) => {
  let query = supabase.from('appointments').select('*');
  
  if (req.query.patientId) query = query.eq('patient_id', req.query.patientId);
  if (req.query.doctorId) query = query.eq('doctor_id', req.query.doctorId);
  if (req.query.date) query = query.eq('date', req.query.date);
  if (req.query.status) query = query.eq('status', req.query.status);
  
  // order by time by default
  query = query.order('time', { ascending: true });
  
  const { data: appts, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  // Manual join - fetch users and doctors for enriched names
  const { data: users, error: usersError } = await supabase.from('users').select('id, name, email, phone, username');
  const { data: doctors } = await supabase.from('doctors').select('id, name, specialty');
  
  const enrichedAppts = (appts || []).map(appt => {
    // Explicit string coercion to avoid type-mismatch with UUIDs
    const user = (users || []).find(u => String(u.id) === String(appt.patient_id));
    const doctor = (doctors || []).find(d => String(d.id) === String(appt.doctor_id));
    
    const patientName = user ? (user.name || user.username) : 'Unknown Patient';
    const doctorName = doctor ? doctor.name : 'Unknown Doctor';

    return {
      ...appt,
      patient_name: patientName,
      patient_email: user?.email || user?.username,
      patient_phone: user?.phone,
      doctor_name: doctorName,
      doctor_specialty: doctor?.specialty
    };
  });

  res.json(enrichedAppts.map(mapToCamel));
});

// 4. Smart Booking
app.post('/api/appointments', async (req, res) => {
  const { doctorId, date, time, patientId, reason } = req.body;

  // Conflict Prevention
  const { data: conflict } = await supabase
    .from('appointments')
    .select('id')
    .eq('doctor_id', doctorId)
    .eq('date', date)
    .eq('time', time)
    .eq('status', 'confirmed')
    .maybeSingle();

  if (conflict) {
    return res.status(400).json({ message: 'Doctor is already booked for this slot.' });
  }

  // Auto Queue: Count existing confirmed appointments for this doctor/date
  const { count } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('doctor_id', doctorId)
    .eq('date', date)
    .eq('status', 'confirmed');

  const newAppointment = {
    patient_id: patientId,
    doctor_id: doctorId,
    date,
    time,
    reason,
    status: 'confirmed',
    queue_position: (count || 0) + 1
  };

  const { data, error } = await supabase
    .from('appointments')
    .insert([newAppointment])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // Auto Notification
  const { data: doctor } = await supabase.from('doctors').select('name').eq('id', doctorId).single();
  
  await supabase.from('notifications').insert([{
    user_id: patientId,
    message: `Appointment confirmed with ${doctor?.name || 'Doctor'} on ${date} at ${time}. Queue #${data.queue_position}`,
    read: false
  }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(mapToCamel(data));
});

// 5. Update Appointment (Cancel/Confirm)
app.patch('/api/appointments/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('appointments')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 6. Stats: Aggregates
app.get('/api/stats', async (req, res) => {
  const { data: appts, error } = await supabase.from('appointments').select('status');
  
  if (error) return res.status(500).json({ error: error.message });
  
  res.json({
    totalBookings: appts.length,
    confirmed: appts.filter(a => a.status === 'confirmed').length,
    pending: appts.filter(a => a.status === 'pending').length,
    cancelled: appts.filter(a => a.status === 'cancelled').length,
  });
});

// 7. Notifications: User specific
app.get('/api/notifications', async (req, res) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', req.query.userId)
    .order('created_at', { ascending: false });
    
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 8. Users: Patients List
app.get('/api/users/patients', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, phone, created_at')
    .eq('role', 'patient');
    
  if (error) return res.status(500).json({ error: error.message });
  res.json((data || []).map(mapToCamel));
});

app.listen(port, () => {
  console.log(`MediQueue Backend (Supabase) running on http://localhost:${port}`);
});
