import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router';
import MyMarquee from '../../page/MyMarquee';
import ShareTripBooking from '../Slider/ShareTripBooking';
import AirlineSearch from '../Cuntry/AirlineSearch';
import TurCard from '../../page/TurCard';
// import FlySkyFooter from '../Footer/FlySkyFooter';
import AwardsBadges from '../Slider/AwardsBadges ';

const Home = () => {
  const tasks = useLoaderData();

  // Initialize darkMode state from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply or remove dark class on html element when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Toggle handler for the button
  // const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Dark mode toggle button */}
      <div className="p-4 flex justify-end">
        {/* <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>

      <ShareTripBooking />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tasks?.slice(0, 6).map(task => (
          <TurCard key={task._id} data={task} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a
          href="/allpak"
          className="bg-blue-400 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition duration-300"
        >
          Show All
        </a>
      </div>

      <AirlineSearch />
      <MyMarquee />
        <AwardsBadges/>
    </div>
  );
};

export default Home;
