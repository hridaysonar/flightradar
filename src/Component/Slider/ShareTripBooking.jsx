import React, { useState } from 'react';
// import bgimg from '../../assets/gjgjhgjhghhg.jpeg'
import bg from '../../assets/gjgjhgjhghhg.jpeg'
import {
  Plane,
  Building2,
  ShoppingBag,
  MapPin,
  CreditCard,
  Smartphone,
  Receipt,
  Search,
  Calendar,
  User,
  ArrowUpDown,
} from 'lucide-react';

const ShareTripBooking = () => {
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('roundTrip');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('economy');

  const tabs = [
    { id: 'flight', label: 'Flight', icon: Plane },
    { id: 'hotel', label: 'Hotel', icon: Building2 },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'holiday', label: 'Holiday', icon: MapPin },
    { id: 'visa', label: 'Visa', icon: CreditCard },
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone },
    { id: 'payBill', label: 'Pay Bill', icon: Receipt },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden mt-20 p-6 rounded-lg border text-black dark:text-white 
      bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 
      border-gray-300 dark:border-gray-700">

      {/* Background Layers */}
      <div className="absolute inset-0 ">
       <div
  className=" w-full h-full absolute inset-0 bg-cover bg-center opacity-70"
  style={{ backgroundImage: `url(${bg})` }}
></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-blue-900/70 to-cyan-900/80"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
          Welcome to <span className="text-cyan-300">ShareTrip!</span>
        </h1>
        <p className="text-xl text-blue-300 font-medium">
          Find Flights, Hotels, Visa & Holidays
        </p>
      </div>

      {/* Booking Widget */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-4 font-medium transition-all duration-300 ${
                  activeTab === id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-800/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* FLIGHT TAB */}
          {activeTab === 'flight' && (
            <div className="p-6">

              {/* Trip Type */}
              <div className="flex gap-6 mb-6">
                {['oneWay', 'roundTrip', 'multiCity'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer text-sm dark:text-gray-300">
                    <input
                      type="radio"
                      name="tripType"
                      value={type}
                      checked={tripType === type}
                      onChange={(e) => setTripType(e.target.value)}
                      className="text-blue-600"
                    />
                    <span>{type.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>

              {/* From / To / Search */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* From */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">From</label>
                  <input
                    type="text"
                    defaultValue="Dhaka"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                  />
                  <div className="absolute top-3 right-3 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">DAC</div>
                  <p className="text-xs text-gray-500 mt-1">Bangladesh, Hazrat Shahjalal...</p>
                </div>

                {/* Swap */}
                <div className="flex items-end justify-center pb-3">
                  <button className="p-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 rounded-full transition-colors">
                    <ArrowUpDown className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">To</label>
                  <input
                    type="text"
                    defaultValue="Cox's Bazar"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                  />
                  <div className="absolute top-3 right-3 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">CXB</div>
                  <p className="text-xs text-gray-500 mt-1">Bangladesh, Cox's Bazar Ai...</p>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>

              {/* Dates, Passengers, Class */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Departure */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Departure</label>
                  <input
                    type="date"
                    defaultValue="2025-06-05"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                  />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>

                {/* Return */}
                {tripType === 'roundTrip' && (
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Return</label>
                    <input
                      type="date"
                      defaultValue="2025-06-07"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Passengers</label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} Traveller{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Class</label>
                  <select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              {/* Fare Type */}
              <div className="flex gap-6 text-sm dark:text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="fareType" value="regular" defaultChecked className="text-blue-600" />
                  <span>Regular Fare</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="fareType" value="student" className="text-blue-600" />
                  <span>Student Fare</span>
                </label>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab !== 'flight' && (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">
                {activeTab === 'hotel' && '🏨'}
                {activeTab === 'shop' && '🛍️'}
                {activeTab === 'holiday' && '🏖️'}
                {activeTab === 'visa' && '📄'}
                {activeTab === 'mobile' && '📱'}
                {activeTab === 'payBill' && '💳'}
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-2">
                {tabs.find((tab) => tab.id === activeTab)?.label} Service
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTab === 'hotel' && 'Find and book the best hotels worldwide'}
                {activeTab === 'shop' && 'Shop for travel essentials and more'}
                {activeTab === 'holiday' && 'Discover amazing holiday packages'}
                {activeTab === 'visa' && 'Get visa assistance for your travel'}
                {activeTab === 'mobile' && 'Recharge your mobile instantly'}
                {activeTab === 'payBill' && 'Pay your bills conveniently'}
              </p>
              <button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '✈️', title: 'Best Flight Deals', desc: 'Find the cheapest flights to your dream destinations' },
            { icon: '🏨', title: 'Luxury Hotels', desc: 'Book premium accommodations at unbeatable prices' },
            { icon: '🎯', title: '24/7 Support', desc: 'Get assistance anytime, anywhere for your travel needs' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareTripBooking;
