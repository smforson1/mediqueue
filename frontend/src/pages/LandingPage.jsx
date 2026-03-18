import { Link } from 'react-router-dom';
import { Calendar, Clock, UserCheck, ChevronRight, ShieldCheck, Mail, Phone, MapPin, PlayCircle, ClipboardList } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col bg-[#fdfdfd]">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 flex flex-col items-start text-left">
          <div className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            The Future of Healthcare Booking
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight mb-6">
            Smart Clinic <br/>
            Bookings, <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
            Say goodbye to long queues and paper logs. Manage your medical appointments effortlessly with our intuitive digital queuing system.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link to="/register" className="btn-primary px-8 py-3.5 rounded-md text-lg shadow-lg shadow-blue-200">
              Book an Appointment Now
            </Link>
            <button className="flex items-center gap-2 text-slate-600 hover:text-primary font-medium transition-colors">
              <PlayCircle className="w-6 h-6" />
              See how it works
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+</div>
            </div>
            <p className="text-sm font-medium text-slate-500">Trusted by 10,000+ patients</p>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          {/* Decorative background blob */}
          <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-60 transform scale-110"></div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-teal-500 aspect-[4/3]">
             {/* Note: User mockup shows a doctor image here. Using a placeholder color that matches. */}
             <div className="absolute inset-0 flex items-center justify-center text-white/50 italic font-medium">
               [Doctor Hero Image Placeholder]
             </div>
          </div>
          
          {/* Floating UI Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Appointment Confirmed</p>
              <p className="text-xs text-slate-500">Today at 10:00 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 px-4 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-teal-500 font-bold tracking-widest text-sm uppercase mb-3 text-[#2dd4bf]">SIMPLE PROCESS</p>
          <h2 className="text-4xl font-black text-slate-900 mb-4">How MediQueue Works</h2>
          <p className="text-slate-500 mb-20">Book your next visit in four simple steps and skip the waiting room entirely.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-0.5 bg-slate-100 -z-10"></div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Find Clinic</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Search for nearby clinics or specific specialists in our extensive network.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Pick Slot</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Choose a time that fits your schedule from the live availability calendar.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Get Queue ID</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Receive a digital token and real-time updates on your wait status.</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-white shadow-sm ring-4 ring-white group-hover:scale-110 transition-transform">4</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Visit & Heal</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">Arrive just in time for your turn. No more crowded waiting rooms!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer aligned with mockup */}
      <footer className="bg-[#1e2330] text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-700/50 pb-12 mb-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
             <Link to="/" className="flex items-center space-x-2 text-white mb-6">
                <div className="bg-primary text-white p-1 rounded">
                   <ClipboardList className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight">MediQueue</span>
             </Link>
             <p className="text-sm leading-relaxed mb-6">
                Modernizing healthcare access through smart, efficient, and patient-centered digital queuing solutions.
             </p>
             <div className="flex gap-4 border-t border-slate-700 pt-4 w-fit">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors">&lt;</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors">&gt;</div>
             </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-transparent selection:text-white mb-6">&nbsp;</h4> {/* Spacer to align with Quick links */}
            <ul className="space-y-3 text-sm">
               <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
               <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
               <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Contact Us</h4>
             <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                   <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                   <a href="mailto:hello@mediqueue.com" className="hover:text-white transition-colors">hello@mediqueue.com</a>
                </li>
                <li className="flex items-start gap-3">
                   <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                   <span>(555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                   <span className="leading-relaxed">123 Health Ave, Medical District<br/>Innovation City, IN 10001</span>
                </li>
             </ul>
          </div>
        </div>
        
        <div className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MediQueue Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
