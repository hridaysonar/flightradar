import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../context/AuthProveider';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaHandHoldingUsd } from "react-icons/fa";
import { Helmet } from 'react-helmet';

// Card Component
const FreelansingCard = ({ data, onDelete }) => {
  const {
    _id,
    title = "Website Redesign Project",
    category = "Web Development",
    description = "Looking for an experienced developer to redesign our company website with modern UI/UX principles.",
    deadline = "June 15, 2025",
    budget = 1500,
    likeCount = 0,
    user = { name: "Alex Johnson", email: "alex@example.com", rating: 4.8 }
  } = data || {};

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const goToDetailsPage = () => {
    const slug = `${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${_id}`; // Slug with ID
    navigate(`/bid/${slug}`, { state: { data } });
  };

  return (
    <div className="perspective-1000 p-4 mt-20">
      <Helmet>
        <title>MyPostad</title>
      </Helmet>
      <div
        ref={cardRef}
        className={`relative rounded-xl overflow-hidden transform transition-all duration-300 ease-out ${isHovered ? 'scale-105 z-10' : 'scale-100'}`}
        style={{
          transform: isHovered ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
          boxShadow: isHovered ? '0 0 25px rgba(59, 130, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          willChange: 'transform, box-shadow'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
      >
        <div
          className="absolute inset-0 rounded-xl z-0"
          style={{
            background: isHovered
              ? `linear-gradient(${position.x * 3.6}deg, #3b82f6, #06b6d4, #8b5cf6, #ec4899, #3b82f6)`
              : 'transparent',
            backgroundSize: '300% 300%',
            animation: isHovered ? 'movingGradient 3s linear infinite' : 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
        />

        <div className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 p-6 m-0.5 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
              <div className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white">{category}</div>
            </div>
            <div className="text-green-400 font-semibold text-lg">${budget}</div>
          </div>

          <p className="text-gray-300 text-sm mb-4">{description}</p>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{user?.name || "Unknown"}</p>
                <div className="text-xs text-yellow-400">★{likeCount}</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Due {deadline}</div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onDelete(_id)}
              className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex justify-center items-center"
              aria-label="Delete task"
            >
              <MdDelete />
            </button>
            <Link to={`/update/${_id}`}>
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex justify-center items-center" aria-label="Edit task">
                <FaEdit />
              </button>
            </Link>
            <button
              onClick={goToDetailsPage}
              className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex justify-center items-center"
              aria-label="Bid on task"
            >
              <FaHandHoldingUsd />
            </button>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes movingGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

// Main Component
const MypostedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!user?.email) return;

  //   fetch(`https://user-task-server-rouge.vercel.app/mytask?email=${user.email}`)
  //     .then(res => res.json())
  //     .then(data => setTasks(data))
  //     .catch(err => {
  //       console.error('Failed to fetch tasks:', err);
  //       setError('Failed to load tasks.');
  //     })
  //     .finally(() => setLoading(false));
  // }, [user]);

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  //   if (!confirmDelete) return;

  //   try {
  //     const res = await fetch(`https://user-task-server-rouge.vercel.app/mytask/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (res.ok) {
  //       setTasks(tasks.filter(task => task._id !== id));
  //     } else {
  //       console.error('Failed to delete task');
  //     }
  //   } catch (err) {
  //     console.error('Error deleting task:', err);
  //   }
  // };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center mt-10 text-gray-500 font-bold text-9xl">No posts here.</div>; 
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {tasks.map(task => (
        <FreelansingCard key={task._id} data={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MypostedTask;
