import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Calendar, Menu, X, ClipboardList } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const getLinkClass = (path, isMobile = false) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    if (isMobile) {
      return `block px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-dark font-bold text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`;
    }
    return `transition-all flex items-center gap-1 py-1 ${isActive ? 'text-white font-bold border-b-2 border-white' : 'text-blue-100 hover:text-white border-b-2 border-transparent'}`;
  };

  return (
    <nav className="bg-white text-slate-700 sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <ClipboardList className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">MediQueue</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
                  <User size={18} />
                  Dashboard
                </Link>
                {user.role === 'patient' && (
                  <Link to="/book" className="btn-primary px-5 py-2 rounded-md font-medium transition-colors">
                    Book Appointment
                  </Link>
                )}
                <button 
                  onClick={handleLogoutClick}
                  className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-primary border border-primary hover:bg-blue-50 px-6 py-2 rounded-md font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-primary text-white hover:bg-primary-dark px-6 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-primary-dark transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark border-t border-blue-400">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className={getLinkClass('/', true)}>Home</Link>
            <Link to="/queue" onClick={toggleMenu} className={getLinkClass('/queue', true)}>Live Queue</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={toggleMenu} className={getLinkClass('/dashboard', true)}>Dashboard</Link>
                {user.role === 'patient' && (
                  <Link to="/book" onClick={toggleMenu} className={getLinkClass('/book', true)}>Book Appointment</Link>
                )}
                <button 
                  onClick={() => { handleLogoutClick(); toggleMenu(); }} 
                  className="block w-full text-left px-3 py-2 rounded-md font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className={getLinkClass('/login', true)}>Login</Link>
                <Link to="/register" onClick={toggleMenu} className={getLinkClass('/register', true)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
