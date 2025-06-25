import React, { useContext, useEffect, useState } from 'react';
import { Eye, Pencil, Trash, Sun, Moon } from 'lucide-react';
import { AuthContext } from '../context/AuthProveider';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const API_BASE_URL = 'https://tour-backend-five.vercel.app/api/v1';

const MyCreate = () => {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1️⃣ Load theme from localStorage or default to false
  const [darkMode, _setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // 2️⃣ Apply theme class on mount + whenever it changes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!user?.email) {
      setPackages([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://tour-backend-five.vercel.app/api/v1/my-tour-package?email=${user.email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setPackages(data.data || []))
      .catch(() => setError('Failed to load your packages'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/tour-package/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPackages(prev => prev.filter(pkg => pkg._id !== id));
      alert('Deleted successfully');
    } catch {
      alert('Error deleting package');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto overflow-hidden shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 mt-20">
      {/* Theme Toggle Button */}
      <Helmet>
        <title>My Create</title>
      </Helmet>
      <div className="flex justify-end mb-4">
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 dark:bg-yellow-500 text-white rounded hover:opacity-90 transition"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>

      <h2 className="text-3xl font-bold text-center mb-4">
        Manage <span className="text-violet-600 dark:text-violet-400">Your Own</span> Packages
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Easily update or delete your added tour packages.
      </p>

      {loading && <p className="text-center">Loading packages...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          <thead className="bg-violet-100 dark:bg-gray-700 text-violet-800 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Photo</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">From</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No tour packages found.
                </td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg._id} className="border-t dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={pkg.image || ''}
                      alt={pkg.tourName || 'Tour Image'}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">{pkg.tourName}</td>
                  <td className="py-3 px-4">{pkg.departureLocation}</td>
                  <td className="py-3 px-4">{pkg.destination}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      title="View"
                      onClick={() => navigate(`/tour-details/${pkg._id}`)}
                      className="text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => navigate(`/update/${pkg._id}`)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(pkg._id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCreate;
