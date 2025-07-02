import React, { useState, useEffect } from 'react';
import TurCard from './TurCard';
import rocket from '../assets/Rock it!.gif'
import { Helmet } from 'react-helmet';
import { Atom } from 'lucide-react';
import { Mosaic } from 'react-loading-indicators';
const AllPakej = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://tour-backend-five.vercel.app/api/v1/tour-package');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const allPackages = Array.isArray(result.data) ? result.data : [];

        setPackages(allPackages);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load packages.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg => {
    const search = searchTerm.trim().toLowerCase();
    return (
      pkg.tourName?.toLowerCase().includes(search) ||
      pkg.destination?.toLowerCase().includes(search) ||
      pkg.departureLocation?.toLowerCase().includes(search)
    );
  });

 if (loading) return (
  <div className="flex flex-col items-center justify-center mt-40 space-y-4 text-center text-gray-600 dark:text-gray-300 ">
    
    {/* 🚀 Replace Rocket Icon with GIF */}
    <div className="relative w-[100%] h-[70%] ml-20">
  <img
    src={rocket}
    alt="Loading"
    className="w-32 h-32 mx-auto rounded-2xl" // Increased size from w-16 h-16 to w-32 h-32
  />

  {/* 🔥 Optional: Rocket Flame Badge */}
  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 badge badge-warning animate-pulse">
    🔥
  </span>
</div>


    {/* 📝 Loading Text */}
    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
      
    </p>
  </div>
)

;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800">
       <Helmet>
        <title>All Pakej</title>
      </Helmet>
      {/* Hero Banner Section - Reduced Height */}
      <div className="relative overflow-hidden mt-30 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-gray-800 dark:to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-5 left-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-10 right-20 w-64 h-64 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-blue-300/15 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 left-20 text-white/20 text-4xl animate-bounce delay-300">✈️</div>
          <div className="absolute top-12 right-32 text-white/20 text-3xl animate-bounce delay-700">🏔️</div>
          <div className="absolute bottom-16 left-40 text-white/20 text-3xl animate-bounce delay-1000">🏖️</div>
          <div className="absolute bottom-8 right-20 text-white/20 text-4xl animate-bounce delay-500">🎒</div>
        </div>

        <div className="relative z-10 px-4 py-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 
                           transform transition-all duration-1000 hover:scale-105
                           bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Discover Amazing
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 
                           animate-pulse transform transition-all duration-700">
              Tour Packages
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed
                          transform transition-all duration-500 hover:text-white">
              🌍 Explore breathtaking destinations around the world with our carefully curated travel experiences.
              Adventure awaits at every corner! ✨
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-white">{packages.length}+</div>
                <div className="text-blue-200">Tour Packages</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="text-3xl mb-2">🌟</div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-blue-200">Happy Travelers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-blue-200">Countries</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 
                               px-6 py-3 rounded-full font-bold text-base shadow-2xl 
                               transform transition-all duration-300 hover:scale-110 hover:shadow-3xl
                               hover:from-yellow-300 hover:to-orange-400">
                <span className="flex items-center gap-2">
                  🚀 Start Your Journey
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold text-base
                               transform transition-all duration-300 hover:scale-105 hover:bg-white hover:text-purple-600
                               backdrop-blur-sm">
                📞 Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-6 fill-slate-50 dark:fill-gray-900">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12">
        {/* Search Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Find Your Perfect Adventure
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Search through our amazing collection of tour packages
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="🔍 Search destinations, locations, or tour names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-6 pr-32 py-5 rounded-full bg-transparent text-gray-800 dark:text-white 
                           placeholder-gray-500 dark:placeholder-gray-400 text-lg focus:outline-none"
                />
                <button className="absolute right-2 top-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 
                                 transform transition-all duration-300 hover:scale-105 shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {filteredPackages.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {searchTerm ? `Found ${filteredPackages.length} packages for "${searchTerm}"` : `All ${filteredPackages.length} Tour Packages`}
                </h4>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
                  <div key={pkg._id}
                    className="transform transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}>
                    <TurCard data={pkg} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
                No packages found
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-lg">
                Try searching with different keywords: "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                         transform transition-all duration-300 hover:scale-105">
                🔄 Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPakej;