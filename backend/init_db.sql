-- MediQueue Database Schema for Supabase SQL Editor

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'patient', -- 'patient', 'admin', 'staff'
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience TEXT,
    available_days TEXT[], -- e.g., ['Monday', 'Tuesday', 'Wednesday']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id),
    doctor_id UUID REFERENCES doctors(id),
    date DATE NOT NULL,
    time TEXT NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'completed'
    queue_position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Data
INSERT INTO doctors (name, specialty, experience, available_days) VALUES 
('Dr. Sarah Johnson', 'Cardiologist', '12 Years', ARRAY['Monday', 'Wednesday', 'Friday']),
('Dr. Michael Chen', 'Pediatrician', '8 Years', ARRAY['Tuesday', 'Thursday', 'Saturday']),
('Dr. Emily Williams', 'Dermatologist', '10 Years', ARRAY['Monday', 'Tuesday', 'Thursday']);

-- Standard Admin User
-- Using simple insert for now (UUID will be auto-generated)
INSERT INTO users (name, username, password, role) VALUES 
('System Admin', 'admin', 'admin123', 'admin');
