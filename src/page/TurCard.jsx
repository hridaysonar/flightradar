import React, { useState } from 'react';
import { Link } from 'react-router';

const TurCard = ({ data }) => {
  const {
    _id,
    tourName,
    image,
    duration,
    departureLocation,
    destination,
    price,
    departureDate,
    packageDetails,
    contactNo,
    likeCount = 0,
  } = data;

  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;

    try {
      const res = await fetch(`https://tour-backend-five.vercel.app/api/v1/tour-package/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'user@example.com' }),
      });

      const result = await res.json();

      if (res.ok && result.modifiedCount > 0) {
        setLikes(prev => prev + 1);
        setLiked(true);
      } else {
        alert(result.message || 'Already liked or failed to update');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="group max-w-sm mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                      transform transition-all duration-700 ease-in-out
                      hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                      group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50 
                      dark:group-hover:from-gray-900 dark:group-hover:to-gray-800">

        {/* Image with overlay animation */}
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={tourName} 
            className="w-full h-56 object-cover transition-transform duration-1000 ease-out
                       group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-800"></div>

          {/* Price badge */}
          <div className="absolute top-4 right-4 transform translate-x-full opacity-0 
                          group-hover:translate-x-0 group-hover:opacity-100 
                          transition-all duration-800 delay-300">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
              ${price}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 
                         transform transition-all duration-500 
                         group-hover:text-blue-600 group-hover:scale-105">
            {tourName}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full 
                           transform transition-all duration-500 delay-200
                           group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-700">
              🕒 {duration}
            </span>
            <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded-full
                           transform transition-all duration-500 delay-300
                           group-hover:scale-110 group-hover:bg-green-200 dark:group-hover:bg-green-700">
              📍 From: {departureLocation}
            </span>
            <span className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded-full
                           transform transition-all duration-500 delay-400
                           group-hover:scale-110 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-700">
              🛬 To: {destination}
            </span>
            <span className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded-full
                           transform transition-all duration-500 delay-500
                           group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-700">
              📅 {departureDate}
            </span>
          </div>

          {/* Package details */}
          <div className="transform transition-all duration-600 group-hover:translate-x-2">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {packageDetails}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <strong>Contact:</strong> {contactNo}
            </p>
          </div>

          {/* Like button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* <span className="text-sm transform transition-all duration-500 group-hover:scale-110">
              ❤️ {likes} likes
            </span> */}
            {/* <button
              onClick={handleLike}
              disabled={liked}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-500 transform
                         hover:scale-105 active:scale-95 ${
                liked
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {liked ? '✓ Liked' : '👍 Like'}
            </button> */}
          </div>

          {/* View Details */}
          <Link
            to={`/tour-details/${_id}`}
            className="block mt-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-700 hover:to-purple-700 text-white font-semibold 
                       py-3 px-6 rounded-full transition-all duration-600 transform
                       hover:scale-105 hover:shadow-xl hover:-translate-y-1
                       active:scale-95"
          >
            🔍 View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurCard;
