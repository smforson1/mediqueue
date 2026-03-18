import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const BookingPage = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', {
        doctorId: selectedDoctor.id,
        patientId: user.id,
        date: selectedDate,
        time: selectedTime,
        reason: reason
      });
      // Pass appointment details to confirmation page via state
      navigate('/confirmation', { state: { appointment: response.data, doctor: selectedDoctor } });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. This slot might be taken.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Book an Appointment</h1>
        <p className="text-slate-600">Select your preferred doctor and schedule your visit.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-secondary-red text-secondary-red flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Doctor Selection */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-slate-200 rounded-medical p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-primary" /> 1. Select Doctor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`cursor-pointer p-4 rounded-medical border-2 transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-primary bg-blue-50'
                      : 'border-slate-100 hover:border-blue-200'
                  }`}
                >
                  <div className="font-bold text-slate-800">{doctor.name}</div>
                  <div className="text-sm text-slate-500">{doctor.specialty}</div>
                  <div className="mt-2 text-xs font-semibold text-primary uppercase tracking-wider">
                    {doctor.experience} Experience
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-medical p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CalendarIcon className="text-primary" /> 2. Pick Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border border-slate-200 rounded-medical focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 text-xs font-medium rounded-md border transition-all ${
                        selectedTime === slot
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-primary'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-medical p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">3. Consultation Reason</h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe why you're visiting..."
              className="w-full p-4 border border-slate-200 rounded-medical min-h-[100px] outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </section>
        </div>

        {/* Right Column: Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-medical-grey rounded-medical p-6 border border-slate-200">
            <h2 className="text-xl font-bold mb-6 border-b border-slate-200 pb-2">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm">Doctor:</span>
                <span className="font-bold text-slate-800 text-right">
                  {selectedDoctor ? selectedDoctor.name : <span className="text-slate-400 font-normal">Not selected</span>}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm">Date:</span>
                <span className="font-bold text-slate-800">
                  {selectedDate ? selectedDate : <span className="text-slate-400 font-normal">Not selected</span>}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-500 text-sm">Time:</span>
                <span className="font-bold text-slate-800">
                  {selectedTime ? selectedTime : <span className="text-slate-400 font-normal">Not selected</span>}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedDoctor || !selectedDate || !selectedTime}
              className={`w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 ${
                isLoading || !selectedDoctor || !selectedDate || !selectedTime ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Booking...' : 'Confirm Appointment'}
              {!isLoading && <ChevronRight />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
