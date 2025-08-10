import React, { useContext, useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMoon, AiOutlineSun } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router';
import { BorderBeam } from '@stianlarsen/border-beam';
import { AuthContext } from '../../context/AuthProveider';
import img1 from '../../assets/nav.png'
import { Link } from 'lucide-react';

// Sidebar Component
const ProfileSidebar = ({ user, logOut }) => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    // { id: 'profiles', icon: "👥", text: "See all profiles", isButton: true, className: "bg-gray-200 text-center font-medium py-2" },
    // { id: 'mycreate', icon: "📦", text: "My Create", action: '/myCreate' },
  
    
   
    //  { id: 'mybookings', icon: "📅", text: "My Bookings",  },
    { id: 'logout', icon: "📤", text: "Log out" }
  ];

  const handleMenuItemClick = (itemId) => {
  setActiveItem(itemId);

  if (itemId === 'logout') {
    if (typeof logOut === 'function') {
      logOut().catch(err => console.error("Logout failed:", err));
    }
  } else if (itemId === 'profiles') {
    navigate('/my-profile');
  } else if (itemId === 'mycreate') {
    navigate('/myCreate');
  } else if (itemId === 'mybookings') {
    navigate('/mybookings');
  }
};



  return (
    <div className="w-80 rounded-lg shadow-lg bg-white overflow-hidden text-gray-800">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={user.photoUrl || user.photoURL} alt="User profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      

      <div className="py-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            className={`${
              item.isButton ? item.className : "px-4 py-3 hover:bg-gray-100 cursor-pointer"
            } ${activeItem === item.id ? "bg-gray-50" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 w-6 text-center">{item.icon}</span>
                <div>
                  <span className="text-gray-800">{item.text}</span>
                  {item.subText && (
                    <div className="text-xs text-gray-500">{item.subText}</div>
                  )}
                </div>
              </div>
              {item.hasArrow && <span className="text-gray-400">›</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 text-xs text-gray-500 border-t border-gray-200">
        <div className="flex flex-wrap gap-x-1">
          <span>Privacy</span><span>·</span><span>Terms</span><span>·</span>
          <span>Advertising</span><span>·</span><span>Ad choices</span><span>›</span><span>·</span>
          <span>Cookies</span><span>·</span>
          <div className="flex flex-wrap">
            <span>More</span><span>·</span><span>Meta © 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme) {
        return localStorage.theme === 'dark';
      } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  });

  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  // const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
      localStorage.removeItem('jwt-token');
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className={`w-full mx-auto flex justify-between items-center rounded-2xl px-4 backdrop-blur-xl relative overflow-visible transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg border border-gray-200/20 py-3' 
          : 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-400/20 border border-white/20 py-6'
      }`}>
        
        {/* Animated Border Beam */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none z-0">
          <BorderBeam 
            size={600} 
            duration={20} 
            colorFrom={isScrolled ? "#3B82F6" : "#7A34F2"} 
            colorTo={isScrolled ? "#06B6D4" : "#87CEEB"} 
          />
        </div>

        {/* Gradient Overlay */}
        {!isScrolled && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-400/10 pointer-events-none z-0"></div>
        )}

        {/* Logo */}
        <div className="flex items-center gap-4 z-10">
          <img 
            className={`cursor-pointer transition-all duration-300 ${isScrolled ? 'w-12' : 'w-20'}`} 
            src={img1} 
            alt="Logo" 
          />
        </div>

        {/* Desktop Navigation */}
        <ul className={`hidden md:flex gap-6 text-lg z-10 transition-all duration-300 ${
          isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
        }`}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `block px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? isScrolled 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-purple-600 text-white shadow-lg"
                  : isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/allpak" 
              className={({ isActive }) => `block px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? isScrolled 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-purple-600 text-white shadow-lg"
                  : isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              All Packages
            </NavLink>
          </li>
         {user && (
  <>
    <li className="mt-2">
      <NavLink
        to="/add-pak"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full transition ${
            isActive
              ? "bg-purple-600 text-white shadow-lg"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        Add Package
      </NavLink>
    </li>
    <li className="mt-2">
      <NavLink
        to="/dashbord"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full transition ${
            isActive
              ? "bg-purple-600 text-white shadow-lg"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        My Dashboard
      </NavLink>
    </li>
  </>
)}

          {/* <li>
            <NavLink 
              to="/dashbord" 
              className={({ isActive }) => `block px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? isScrolled 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-purple-600 text-white shadow-lg"
                  : isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              My Dashbord
            </NavLink>
          </li> */}
          
          <li>
            <NavLink 
              to="/Blog" 
              className={({ isActive }) => `block px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? isScrolled 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-purple-600 text-white shadow-lg"
                  : isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              About
            </NavLink>
          </li>
         
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="relative flex gap-4 items-center z-10">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isScrolled 
                ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            {darkMode ? <AiOutlineSun size={22} /> : <AiOutlineMoon size={22} />}
          </button>

          {user ? (
            <div className="relative group cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                src={user.photoURL || user.photoUrl}
                alt="Profile"
                className={`rounded-full object-cover transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'w-10 h-10 border-2 border-blue-500 hover:ring-2 hover:ring-blue-400' 
                    : 'w-12 h-12 border-2 border-white hover:ring-2 hover:ring-white/50'
                }`}
              />
              <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 ${
                isScrolled 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white/90 text-gray-800 backdrop-blur-sm'
              }`}>
                {user.name}
              </div>
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <ProfileSidebar user={user} logOut={handleLogout} />
                </div>
              )}
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              }`}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full mt-2 mx-auto px-4 z-40 transition-all duration-300`}>
          <div className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
            isScrolled 
              ? 'bg-white/95 dark:bg-gray-900/95 border-gray-200/20' 
              : 'bg-white/10 border-white/20'
          }`}>
            <ul className="py-4">
              <li>
                <NavLink 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-6 py-3 transition-all duration-300 ${
                    isActive 
                      ? isScrolled 
                        ? "bg-blue-600 text-white" 
                        : "bg-purple-600 text-white"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-white hover:bg-white/20"
                  }`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/allpak" 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-6 py-3 transition-all duration-300 ${
                    isActive 
                      ? isScrolled 
                        ? "bg-blue-600 text-white" 
                        : "bg-purple-600 text-white"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-white hover:bg-white/20"
                  }`}
                >
                  All Packages
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/add-pak" 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-6 py-3 transition-all duration-300 ${
                    isActive 
                      ? isScrolled 
                        ? "bg-blue-600 text-white" 
                        : "bg-purple-600 text-white"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-white hover:bg-white/20"
                  }`}
                >
               Add Package
                </NavLink>
              </li>
             
              <li>
                <NavLink 
                  to="/Blog" 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-6 py-3 transition-all duration-300 ${
                    isActive 
                      ? isScrolled 
                        ? "bg-blue-600 text-white" 
                        : "bg-purple-600 text-white"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-white hover:bg-white/20"
                  }`}
                >
                  About
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;