import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProveider';
import { MapPin, Calendar, Clock, Users, Star, Heart, Share2, Camera, CheckCircle, Sun, Moon } from 'lucide-react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const TurDeltes = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
   const [isBooked, setIsBooked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);
  useEffect(()=>{
     const fetchBookings = () => {
    fetch(`https://tour-backend-five.vercel.app/api/v1/tour-booking?email=${user.email}`) 
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => {
         console.log(data);
         console.log(id);
        const findData = data.data.find(item => item._id==id)
        if (findData) {
          setIsBooked(true)
        }
       
      }
       )
      .catch((error) => console.error('Fetch error:', error));
  };
  fetchBookings()
  },[user.email,id])
  console.log(isBooked);
  // Apply theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const _toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid tour ID');
      setLoading(false);
      return;
    }

    const fetchPackage = async () => {
      try {
        const res = await fetch(`https://tour-backend-five.vercel.app/api/v1/tour-package/${id}`);
        if (!res.ok) throw new Error(`Failed to load package data. Status: ${res.status}`);

        const result = await res.json();
        if (!result || result.error) throw new Error(result.message || 'Failed to load package data');

        setPackageData(result.data || result);
      } catch (err) {
        setError(err.message || 'Could not fetch package details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  // Better photo URL validation
  const isValidPhotoURL = (url) => {
    if (!url) return false;
    return url.startsWith('https://') && (
      url.includes('googleusercontent.com') ||
      url.includes('facebook.com') ||
      url.includes('githubusercontent.com') ||
      url.includes('gravatar.com') ||
      url.includes('cloudinary.com') ||
      url.includes('amazonaws.com') ||
      url.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i)
    );
  };

  const hasVerifiedPhoto = isValidPhotoURL(user?.photoURL);

  // Handle booking
  const handleBooking = async () => {
  if (!user) {
    Swal.fire('Login Required', 'Please login to book this tour', 'warning');
    return;
  }

  setBookingLoading(false);

  try {
    const bookingData = {
      email: user.email,
      tourPackage: id,
    };

    const response = await fetch(`https://tour-backend-five.vercel.app/api/v1/tour-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      if (result?.message?.includes('already booked')) {
        setIsBooked(true);
        
        Swal.fire('Already Booked', 'You have already booked this tour!', 'info');
      } else {
        Swal.fire('❌ Booking Failed', result?.message || 'Something went wrong.', 'error');
        setBookingLoading(false);
      }
      return;
    }
    setIsBooked(true);
    Swal.fire('🎉 Booking Successful!', 'Your adventure awaits!', 'success');
    navigate('/mybookings');
  } catch (error) {
    console.error('Booking error:', error);
    Swal.fire('❌ Booking Failed', 'Something went wrong. Please try again.', 'error');
  } finally {
    setBookingLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800">
        <Helmet>
        <title>Tur details</title>
      </Helmet>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-red-900">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!packageData) return null;

  const {
    tourName,
    image,
    guide = {},
    duration,
    price,
    packageDetails,
    bookingCount,
    departureLocation,
    departureDate,
    destination,
  } = packageData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800 mt-30">
      
      {/* Theme Toggle Button - Fixed Position */}
      {/* <button
        onClick={toggleTheme}
        className="fixed top-20 right-4 z-50 p-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </button> */}

      {/* Hero Section */}
      <div className="relative h-60 sm:h-72 md:h-[60vh] lg:h-[70vh] w-[90%] sm:w-[85%] md:w-[80%] mx-auto overflow-hidden rounded-2xl">
        <img 
          src={image} 
          alt={tourName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg">
            ✨ Premium Tour
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg">
            🏔️ Adventure
          </span>
        </div>

        {/* Title & Rating */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white font-medium text-sm">4.9 (127 reviews)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">
            {tourName}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-3 h-3" />
            <span className="font-medium text-sm">{destination}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info Cards */}
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-800/95">
                <Calendar className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Departure</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{departureDate}</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-800/95">
                <Clock className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{duration}</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-800/95">
                <Users className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bookings</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{bookingCount || 0}</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-800/95">
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">From</p>
                <p className="font-bold text-gray-800 dark:text-gray-200 text-xs leading-tight">{departureLocation}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                About This Adventure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{packageDetails}</p>
            </div>

            {/* Tour Guide */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                <span className="w-6 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></span>
                Your Tour Guide
              </h2>
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  {/* Profile Image Container */}
                  <div className={`w-20 h-20 rounded-2xl overflow-hidden border-3 shadow-lg ring-2 ${
                    hasVerifiedPhoto 
                      ? 'border-white dark:border-gray-600 ring-blue-500/30' 
                      : 'border-blue-200 dark:border-blue-400 ring-blue-300/50 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900'
                  }`}>
                    {hasVerifiedPhoto ? (
                      <img
                        src={user?.photoURL}
                        alt={guide.name || user?.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800">
                        <span className="text-white font-bold text-2xl">
                          {(guide.name || user?.displayName || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Verified Badge */}
                  {hasVerifiedPhoto && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white fill-current" />
                    </div>
                  )}
                  
                  {/* Online Status */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-lg"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate">
                      {guide.name || user?.displayName || 'Tour Guide'}
                    </h3>
                    {hasVerifiedPhoto && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                        <CheckCircle className="w-3 h-3 fill-current" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm flex items-center gap-1">
                    <span>📞</span>
                    {guide.contactNo || 'Contact available after booking'}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">4.8 • 89 tours</span>
                  </div>
                  
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  ${price}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-400">/person</span>
                </div>
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm">🎯 Best Price Guaranteed</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName || ''}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 text-sm text-gray-800 dark:text-gray-200"
                    placeholder="Enter your name"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 text-sm text-gray-800 dark:text-gray-200"
                    placeholder="Enter your email"
                    readOnly
                  />
                </div>

                <button
  onClick={handleBooking}
  disabled={bookingLoading || !user || isBooked}
  className={`w-full py-4 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base ${
    bookingLoading || isBooked
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
  }`}
>
  {bookingLoading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Booking...
    </div>
  ) : isBooked ? (
    '✅ Already Booked'
  ) : (
    '🎫 Book Now'
  )}
</button>


                <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                  🔒 Secure booking • Free cancellation up to 24h
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-sm">
                  <span className="text-green-500">✨</span>
                  What's Included
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: '🎯', text: 'Expert Guided Tour' },
                    { icon: '🛡️', text: 'Travel Insurance' },
                    { icon: '🥤', text: 'Refreshments & Snacks' },
                    { icon: '🎫', text: 'All Entry Tickets' },
                    { icon: '📸', text: 'Professional Photos' },
                    { icon: '🎁', text: 'Souvenir Package' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-base">{item.icon}</span>
                      <span className="font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-1 text-sm">
                  <span>🔥</span>
                  Limited Time Offer
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Book within 24 hours and get 15% off your next adventure!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurDeltes;