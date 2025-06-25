import React from 'react';
import { ChevronRight } from 'lucide-react';

const AirlineSearch = () => {
  const airlines = [
    { name: "Biman Bangladesh Airlines", logo: "🇧🇩", color: "bg-red-500" },
    { name: "US-Bangla Airlines", logo: "✈️", color: "bg-blue-500" },
    { name: "NOVOAIR", logo: "🌊", color: "bg-orange-500" },
    { name: "Air Astra", logo: "⭐", color: "bg-yellow-500" },
    { name: "Emirates", logo: "🏜️", color: "bg-red-600" },
    { name: "Singapore Airlines", logo: "🦅", color: "bg-yellow-600" },
    { name: "Turkish Airlines", logo: "🦃", color: "bg-red-700" },
    { name: "Qatar Airways", logo: "🌙", color: "bg-purple-600" },
    { name: "Malaysia Airlines", logo: "🇲🇾", color: "bg-blue-600" },
    { name: "Vistara", logo: "💫", color: "bg-orange-400" },
    { name: "Etihad Airways", logo: "🏺", color: "bg-yellow-700" },
    { name: "Cathay Pacific Airways", logo: "🐉", color: "bg-green-600" },
    { name: "Himalaya Airlines", logo: "🏔️", color: "bg-blue-700" },
    { name: "Thai Lion Air", logo: "🦁", color: "bg-red-600" },
    { name: "Saudia Airlines", logo: "🕌", color: "bg-green-700" },
    { name: "Batik Air", logo: "🎨", color: "bg-orange-600" },
    { name: "British Airways", logo: "🇬🇧", color: "bg-blue-800" },
    { name: "Jetstar Pacific", logo: "⭐", color: "bg-orange-500" },
    { name: "Maldivian", logo: "🏝️", color: "bg-pink-600" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg m-0.5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Search Top Airlines
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ShareTrip's user-friendly platform connects you to top airlines instantly. Enjoy a comfortable
            and hassle-free journey on any destination and get tickets of top airlines easily
          </p>
        </div>

        {/* Airlines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${airline.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {airline.logo}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {airline.name}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Click on any airline to explore flight options and booking details
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirlineSearch;
