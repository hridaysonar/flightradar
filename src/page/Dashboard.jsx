import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { User, Users, BookOpen, LogOut, Search, Bell, Settings, TrendingUp, Calendar, Star, Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(true);
    document.documentElement.classList.add('dark'); // default dark
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, to: '/' },
    { id: 'profiles', label: 'See All Profiles', icon: Users, to: '/my-profile' },
    { id: 'create', label: 'My Create', icon: BookOpen, to: '/myCreate' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, to: '/mybookings' },
  ];

  const stats = [
    { label: 'Total Profiles', value: '2,547', change: '+12%' },
    { label: 'My Creates', value: '186', change: '+8%' },
    { label: 'Active Bookings', value: '24', change: '+15%' },
    { label: 'Completed', value: '142', change: '+22%' },
  ];

  const recentActivity = [
    { action: 'New profile created', time: '2 minutes ago', user: 'John Doe' },
    { action: 'Booking confirmed', time: '1 hour ago', user: 'Sarah Smith' },
    { action: 'Profile updated', time: '3 hours ago', user: 'Mike Johnson' },
    { action: 'New booking request', time: '5 hours ago', user: 'Emma Wilson' },
  ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 mt-26">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`w-64 bg-gray-200 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-800 transition-all duration-500 transform ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Professional Panel</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      active
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className={`bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 p-6 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your account today.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <button className="p-2 bg-gray-300 dark:bg-gray-800 rounded-lg hover:scale-110 transition">
                    <Bell className="w-5 h-5" />
                  </button>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {notifications}
                    </span>
                  )}
                </div>
                <button className="p-2 bg-gray-300 dark:bg-gray-800 rounded-lg hover:scale-110 transition" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className="p-2 bg-gray-300 dark:bg-gray-800 rounded-lg hover:scale-110 transition">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6 h-full overflow-y-auto bg-white dark:bg-black">
            {location.pathname === '/' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gray-200 dark:bg-gray-900 rounded-xl p-6 border border-gray-300 dark:border-gray-800 transition-all duration-500 transform hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                          <p className="text-3xl font-bold mt-2">{stat.value}</p>
                          <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.change}</span>
                        </div>
                        <div className="w-12 h-12 bg-white dark:bg-gray-200 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-black" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-200 dark:bg-gray-900 rounded-xl p-6 border border-gray-300 dark:border-gray-800">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-300 dark:bg-gray-800 rounded-lg hover:translate-x-2 transition"
                      >
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-gray-700 dark:text-gray-400 text-sm">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* You can add more conditional renders here for other routes if you want */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
