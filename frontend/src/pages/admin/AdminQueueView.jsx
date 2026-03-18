import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FolderOpen, LogOut, Search, Printer, Download, ChevronDown, UserCircle2 } from 'lucide-react';
import axios from 'axios';

const AdminQueueView = ({ onLogout }) => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState('All Doctors');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docsRes, apptsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/doctors'),
        axios.get('http://localhost:5000/api/appointments')
      ]);
      setDoctors(docsRes.data);
      setQueue(apptsRes.data.filter(a => a.status !== 'cancelled'));
    } catch (err) {
      console.error('Failed to fetch queue data', err);
    }
  };

  const filteredQueue = queue.filter(apt => {
    const docMatch = filterDoctor === 'All Doctors' || apt.doctorId === filterDoctor || (apt.doctorName && (apt.doctorName === filterDoctor || `Dr. ${apt.doctorName}` === filterDoctor));
    const searchMatch = searchQuery === '' || (apt.patientName && apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()));
    return docMatch && searchMatch;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Checked In':
        return <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider">{status}</span>;
      case 'In Progress':
        return <span className="bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider">{status}</span>;
      case 'Waiting':
        return <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider">{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="flex bg-[#f4f7fb] min-h-screen font-sans">
      
      {/* Sidebar - Reused layout */}
      <div className="w-64 bg-[#1b253b] text-slate-300 flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 text-white mb-10">
            <div className="bg-blue-500 text-white p-1.5 rounded-md">
               <UserCircle2 size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block">MediQueue</span>
              <span className="text-[10px] text-blue-300 uppercase tracking-widest block font-medium">Admin Panel</span>
            </div>
          </Link>

          <nav className="space-y-1">
            <Link to="/admin" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/queue" className="flex items-center gap-3 bg-blue-500/10 text-white border-l-4 border-blue-500 px-4 py-3 rounded-r-lg font-medium">
              <Users size={18} /> Manage Queue
            </Link>
            <Link to="/admin/schedules" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <Calendar size={18} /> Schedules
            </Link>
            <Link to="/admin/patients" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <FolderOpen size={18} /> Patient Records
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-700/50">
          <button 
            onClick={() => { onLogout(); navigate('/login'); }} 
            className="flex items-center gap-3 text-red-300 hover:text-red-200 font-medium transition-colors w-full"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-12 flex justify-center items-start">
        
        {/* Mockup Container (White Box) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-5xl overflow-hidden p-10">
          
          {/* Header section matching Image 2 */}
          <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-100">
            <div>
              <h1 className="text-3xl font-bold text-[#1b253b] mb-1">MediQueue Admin</h1>
              <p className="text-slate-500 font-medium">Daily Queue Snapshot - March 6, 2026</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#1b253b] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
                <Printer size={16} /> PRINT
              </button>
              <button className="bg-white border border-slate-200 text-[#1b253b] px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                <Download size={16} /> EXPORT CSV
              </button>
            </div>
          </div>

          {/* Filters Area matching Image 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-10 flex gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-700 mb-2">Filter by Doctor</label>
              <div className="relative">
                <select 
                  className="appearance-none w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                >
                  <option value="All Doctors">All Doctors</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={`Dr. ${doc.name}`}>Dr. {doc.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex-[2] relative">
              <label className="block text-xs font-bold text-slate-700 mb-2">Search Patient Name</label>
              <input 
                type="text" 
                placeholder="Type name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={16} className="absolute left-4 top-[34px] text-slate-400" />
            </div>
          </div>

          {/* Table matched precisely to Image 2 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1b253b] mb-4">Current Queue List</h2>
            <div className="rounded-xl border border-[#e0e8f0] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#eaf3fa] text-[#4f6b88] text-[11px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">TIME</th>
                    <th className="px-6 py-4">PATIENT NAME</th>
                    <th className="px-6 py-4">DOCTOR</th>
                    <th className="px-6 py-4">REASON FOR VISIT</th>
                    <th className="px-6 py-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQueue.length === 0 ? (
                    <tr><td colSpan="5" className="py-8 text-center text-slate-500">No patients in the queue matching your filters.</td></tr>
                  ) : (
                    filteredQueue.map((pat) => (
                      <tr key={pat.id} className="hover:bg-slate-50">
                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">{pat.time}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-900">{pat.patientName || 'Unknown Patient'}</td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-600">
                          {pat.doctorName ? (pat.doctorName.startsWith('Dr. ') ? pat.doctorName : `Dr. ${pat.doctorName}`) : 'Dr. Unknown'}
                        </td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-600">{pat.reason || 'General Checkup'}</td>
                        <td className="px-6 py-5">
                          {getStatusBadge(pat.status === 'confirmed' ? 'Waiting' : (pat.status === 'pending' ? 'Checked In' : pat.status))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-6">
             <div>
               <p className="text-sm font-bold text-slate-800 mb-1">Total Patients in Queue: <span className="font-normal text-slate-600">{filteredQueue.length.toString().padStart(2, '0')}</span></p>
               <p className="text-sm font-bold text-slate-800">Estimated Avg. Wait: <span className="font-normal text-slate-600">22 mins</span></p>
             </div>
             <div className="text-right">
               <p className="text-xs text-slate-400 mb-1">Generated by MediQueue v1.0.4</p>
               <p className="text-xs text-slate-400">Confidential Medical Document - For Internal Use Only</p>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminQueueView;
