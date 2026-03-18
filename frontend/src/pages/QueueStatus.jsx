import { useState, useEffect } from 'react';
import { Clock, Users, ArrowRight, PlayCircle, SkipForward, RefreshCcw } from 'lucide-react';
import axios from 'axios';

const QueueStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      // Filter for today's confirmed appointments and sort by queue position
      const today = new Date().toISOString().split('T')[0];
      const activeQueue = response.data
        .filter(a => a.date === today && a.status === 'confirmed')
        .sort((a, b) => a.queuePosition - b.queuePosition);
      setAppointments(activeQueue);
    } catch (err) {
      console.error('Failed to fetch queue');
    } finally {
      setIsLoading(false);
    }
  };

  const currentPatient = appointments[0];
  const nextUp = appointments.slice(1, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Clock className="text-primary animate-pulse" size={40} />
          Live Clinic Queue
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Monitor real-time patient status. Please stay in the waiting area if your number is near the top.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Currently Serving */}
        <div className="lg:col-span-2">
          <div className="bg-primary rounded-medical p-10 text-white shadow-2xl shadow-blue-200 flex flex-col items-center text-center">
            <div className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-100 mb-6">Currently Serving</div>
            {currentPatient ? (
              <>
                <div className="text-[120px] leading-tight font-black mb-4 select-none">
                  #{currentPatient.queuePosition}
                </div>
                <div className="text-3xl font-bold bg-white bg-opacity-10 px-6 py-2 rounded-full mb-8">
                  Patient: {currentPatient.patientId.slice(0, 6)}
                </div>
                <div className="grid grid-cols-2 gap-8 w-full max-w-md border-t border-white border-opacity-20 pt-8">
                  <div>
                    <div className="text-blue-200 text-sm mb-1 uppercase font-bold tracking-wider">Doctor</div>
                    <div className="text-xl font-bold">Dr. {currentPatient.doctorId}</div>
                  </div>
                  <div>
                    <div className="text-blue-200 text-sm mb-1 uppercase font-bold tracking-wider">Est. Time</div>
                    <div className="text-xl font-bold">In Progress</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-20 text-2xl font-bold italic opacity-60">
                Clinic is currently clear
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={fetchQueue} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-full font-bold transition-all">
              <RefreshCcw size={18} /> Refresh Display
            </button>
          </div>
        </div>

        {/* Up Next List */}
        <div className="space-y-6">
          <div className="bg-white rounded-medical border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Users className="text-primary" size={24} /> Up Next
            </h2>
            
            <div className="space-y-4">
              {nextUp.length > 0 ? (
                nextUp.map((appt, idx) => (
                  <div key={appt.id} className="flex items-center justify-between p-4 bg-medical-grey rounded-medical border border-transparent hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-800 shadow-sm">
                        {appt.queuePosition}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Patient {appt.patientId.slice(0, 4)}</div>
                        <div className="text-xs text-slate-500">Wait: ~{(idx + 1) * 15} mins</div>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-300" size={18} />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 italic">
                  No other patients in line
                </div>
              )}
            </div>

            {appointments.length > 4 && (
              <div className="mt-6 text-center text-sm font-semibold text-primary">
                +{appointments.length - 4} more patients waiting
              </div>
            )}
          </div>

          <div className="bg-medical-blue rounded-medical p-6 border border-blue-100">
             <h3 className="font-bold text-slate-800 mb-2">Clinic Advisory</h3>
             <p className="text-sm text-slate-600 leading-relaxed">
               Please notify the front desk if you need assistance. Average wait time is currently 12 minutes.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;
