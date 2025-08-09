import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router';
import MyMarquee from '../../page/MyMarquee';
import ShareTripBooking from '../Slider/ShareTripBooking';
import AirlineSearch from '../Cuntry/AirlineSearch';
import TurCard from '../../page/TurCard';
// import FlySkyFooter from '../Footer/FlySkyFooter';
import AwardsBadges from '../Slider/AwardsBadges ';
import ExpediaAppSection from '../../page/ExpediaAppSection';

const Home = () => {
  const tasks = useLoaderData();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  
  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Dark mode toggle button */}
      <div className="p-4 flex justify-end">
       
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
        {/* <br />
        <br />
        <br />
        <ExpediaAppSection/>
        <br />
        <br />
        <br /> */}
    </div>
  );
};

export default Home;
