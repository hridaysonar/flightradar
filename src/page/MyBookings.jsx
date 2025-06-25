import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { AuthContext } from '../context/AuthProveider';
import { Helmet } from 'react-helmet';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  // ✅ Initialize dark mode from localStorage
  const [isDarkMode, _setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true'; // stored value is always string
  });

  useEffect(() => {
    fetchBookings();
  }, [])

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // ✅ Save to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const fetchBookings = () => {
    fetch(`https://tour-backend-five.vercel.app/api/v1/tour-booking?email=${user.email}`) 
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => setBookings(data.data || []))
      .catch((error) => console.error('Fetch error:', error));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://tour-backend-five.vercel.app/api/v1/tour-booking/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
      } else {
        const errorData = await res.json();
        console.error('Delete failed:', errorData);
        alert('Failed to delete booking');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('An error occurred while deleting');
    }
  };

  return (
    <div className="container mx-auto p-6 transition-all duration-300 mt-20">
      <Helmet>
        <title>My Booking</title>
      </Helmet>
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        {/* <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
        >
          {isDarkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button> */}
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 overflow-hidden shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        My <span className="text-purple-600 dark:text-purple-400">Bookings</span>
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
        View, manage, and keep track of all your event bookings.
      </p>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left">
          <thead className="bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">Event Photo</th>
              <th className="px-4 py-3">Event Name</th>
              <th className="px-4 py-3">Event Type</th>
              <th className="px-4 py-3">Event Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((item) => (
              <tr key={item._id} className="border-t dark:border-gray-700">
                <td className="px-4 py-3">
                  <img
                    src={item?.tourPackage?.image || 'https://via.placeholder.com/60'}
                    alt="event"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{item?.tourPackage?.tourName}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item?.tourPackage?.destination}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item?.tourPackage?.departureDate}</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 font-semibold">
                  {item?.status || 'Booked'}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 transition text-xl"
                    onClick={() => handleDelete(item._id)}
                    title="Delete Booking"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
