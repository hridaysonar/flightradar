import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { Helmet } from 'react-helmet';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [darkMode, setDarkMode] = useState(false);  // <-- state for dark mode toggle

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewUsername(currentUser.displayName || '');
        setNewAvatar(currentUser.photoURL || '');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
        photoURL: newAvatar
      });
      setUser(auth.currentUser);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!user) return null;

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800`}>
      <Helmet><title>My Profile</title></Helmet>

      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">My Profile</h2>

        <img
          src={editing ? newAvatar : user.photoURL}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow"
        />

        {editing ? (
          <>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="New username"
            />
            <input
              type="text"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="New photo URL"
            />
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Save Changes
              </button>
              <button onClick={handleEditToggle} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2"><strong>Username:</strong> {user.displayName}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-blue-600 dark:text-blue-400 text-sm break-all mb-6">
              <a href={user.photoURL} target="_blank" rel="noreferrer">{user.photoURL}</a>
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
