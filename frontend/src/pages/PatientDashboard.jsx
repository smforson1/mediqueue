import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, LogOut, LayoutDashboard, PlusCircle, Menu, X, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const PatientDashboard = ({ user, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [user?.id]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments?patientId=${user?.id}&status=confirmed`);
      const sorted = (response.data || []).sort((a, b) => new Date(a.date) - new Date(b.date));
      setAppointments(sorted);
    } catch (err) {
      console.error('Failed to load appointments.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentAppt = appointments[0]; // Simplified: assume first is current

  return (
    <div className="flex h-screen bg-[#fdfdfd] overflow-hidden font-sans">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#111827] text-slate-300 transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white mb-10">
            <div className="bg-teal-500 text-white p-1 rounded">
               <CheckCircle2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">MediQueue</span>
          </Link>

          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 bg-[#1e3a8a] text-white px-4 py-3 rounded-lg font-medium">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/book" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <Calendar size={20} /> Book Appointment
            </Link>
            <Link to="/profile" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <User size={20} /> My Profile
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
            onClick={() => { onLogout(); navigate('/login'); }} 
            className="flex items-center gap-3 text-red-400 hover:text-red-300 font-medium transition-colors w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back, {user?.name || 'John Doe'}!</h1>
            <p className="text-slate-500">Here's your status for today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Status Widget */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 relative overflow-hidden">
               <div className="flex items-center gap-2 text-slate-800 font-bold mb-8">
                  <ActivityIcon size={20} className="text-blue-500" /> Current Queue Status
               </div>
               
               {currentAppt ? (
                 <div className="flex justify-between items-end relative z-10">
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">NEXT APPT</p>
                     <p className="text-xl font-medium text-slate-800">
                       {currentAppt.doctorName ? (currentAppt.doctorName.startsWith('Dr. ') ? currentAppt.doctorName : `Dr. ${currentAppt.doctorName}`) : 'Dr. Unknown'}
                     </p>
                   </div>
                   <div className="text-center">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">YOUR POSITION</p>
                     <p className="text-5xl font-black text-teal-600">#{currentAppt.queuePosition?.toString().padStart(2, '0') || '01'}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">EST. WAIT</p>
                     <p className="text-xl font-medium text-blue-600">~{currentAppt.queuePosition ? currentAppt.queuePosition * 15 : 15} mins</p>
                   </div>
                 </div>
               ) : (
                 <div className="text-center text-slate-500 py-4 relative z-10">No active appointments today.</div>
               )}

               {/* Background Hourglass icon mockup */}
               <div className="absolute right-4 bottom-4 text-slate-50 opacity-50 z-0">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>
               </div>
            </div>

            {/* Quick Action Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <PlusCircle size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Need a new booking?</h3>
              <p className="text-sm text-slate-500 mb-6">Schedule your next visit easily.</p>
              <Link to="/book" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md shadow-blue-200">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center gap-2 text-slate-800 font-bold mb-6">
              <Calendar size={20} className="text-teal-600" /> Upcoming Appointments
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-widest">
                    <th className="pb-4 font-bold">DATE</th>
                    <th className="pb-4 font-bold">TIME</th>
                    <th className="pb-4 font-bold">DOCTOR</th>
                    <th className="pb-4 font-bold">CLINIC</th>
                    <th className="pb-4 font-bold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                   {isLoading ? (
                     <tr><td colSpan="5" className="py-8 text-center text-slate-500">Loading appointments...</td></tr>
                   ) : appointments.length === 0 ? (
                     <tr><td colSpan="5" className="py-8 text-center text-slate-500 font-medium">No upcoming appointments.</td></tr>
                   ) : (
                     appointments.map((appt, idx) => (
                       <tr key={appt.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                         <td className="py-4 font-medium text-slate-800">{new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                         <td className="py-4 text-slate-600">{appt.time}</td>
                         <td className="py-4 font-medium text-slate-800 flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'}`}>
                              {appt.doctorName ? appt.doctorName.replace('Dr. ', '').charAt(0) : 'D'}
                           </div>
                           {appt.doctorName ? (appt.doctorName.startsWith('Dr. ') ? appt.doctorName : `Dr. ${appt.doctorName}`) : 'Dr. Unknown'}
                         </td>
                         <td className="py-4 text-slate-500">General Wellness Center</td>
                         <td className="py-4 text-right">
                           <button className="text-blue-500 font-medium hover:underline mr-4">Reschedule</button>
                           <button className="text-red-400 font-medium hover:underline">Cancel</button>
                         </td>
                       </tr>
                     ))
                   )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Simple functional icon for the mock
const ActivityIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

export default PatientDashboard;
