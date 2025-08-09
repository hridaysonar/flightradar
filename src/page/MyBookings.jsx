import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { AuthContext } from '../context/AuthProveider';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';  

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (!user?.email) return;
    fetchBookings();
  }, [user?.email]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // Listen for changes to 'darkMode' from other tabs/components
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'darkMode') {
        setIsDarkMode(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://tour-backend-five.vercel.app/api/v1/tour-booking/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setBookings(prev => prev.filter((booking) => booking._id !== id));

          Swal.fire(
            'Deleted!',
            'Your booking has been deleted.',
            'success'
          );
        } else {
          Swal.fire('Failed!', 'Failed to delete booking.', 'error');
        }
      } catch (err) {
        console.error('Error deleting booking:', err);
        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 transition-all duration-300 mt-20">
      <Helmet>
        <title>My Booking</title>
      </Helmet>

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
