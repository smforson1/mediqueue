import { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Edit2, Save, X, Clock, User } from 'lucide-react';
import axios from 'axios';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (err) {
      console.error('Failed to fetch doctors');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSchedule = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditing(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Doctor Management</h1>
          <p className="text-slate-600">Manage medical staff and their available schedules.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add New Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold mb-4">Staff Directory</h2>
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`p-4 rounded-medical border-2 transition-all cursor-pointer ${
                selectedDoctor?.id === doctor.id ? 'border-primary bg-blue-50' : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                  <User size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">{doctor.name}</div>
                  <div className="text-sm text-slate-500">{doctor.specialty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Editor */}
        <div className="lg:col-span-2">
          {selectedDoctor ? (
            <div className="bg-white border border-slate-200 rounded-medical overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-2 rounded-lg">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedDoctor.name}'s Schedule</h3>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Active Availability</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-secondary-red transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                      <Clock size={16} className="text-primary" /> Weekly Hours
                    </h4>
                    <div className="space-y-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <div key={day} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded">
                          <span className="font-medium text-slate-600">{day}</span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">09:00 - 17:00</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm p-2 opacity-50">
                        <span className="font-medium text-slate-600">Saturday</span>
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                      <Plus size={16} className="text-primary" /> Specific Slots
                    </h4>
                    <p className="text-xs text-slate-500">Add or remove specific booking windows for this doctor.</p>
                    <div className="flex flex-wrap gap-2">
                      {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'].map(slot => (
                        <div key={slot} className="flex items-center gap-2 bg-blue-50 text-primary border border-blue-100 px-3 py-1 rounded-md text-sm font-semibold">
                          {slot}
                          <X size={14} className="cursor-pointer hover:text-blue-700" />
                        </div>
                      ))}
                      <button className="text-slate-400 border-2 border-dashed border-slate-200 px-3 py-1 rounded-md text-sm hover:border-primary hover:text-primary transition-all">
                        + Add Slot
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-medical-blue p-6 rounded-medical border border-blue-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-800">Need to pause bookings?</h5>
                    <p className="text-sm text-slate-600">You can temporarily disable this doctor's schedule from public view.</p>
                  </div>
                  <button className="btn-secondary px-6">Deactivate Schedule</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 border-dashed rounded-medical p-20 text-center text-slate-400">
              <User size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium">Select a doctor to manage their schedule</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
