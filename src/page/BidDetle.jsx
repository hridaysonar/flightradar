import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProveider';

const BidDetle = () => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);

//   const {user} = AuthP 
//   const user = { email: "user@example.com" }; // Replace with actual user context
  const { user } = useContext(AuthContext);

  const { state } = useLocation();
  const data = state?.data || { _id: "sample123" };

  const handleSubmit = () => {
    if (hasLiked) return;

    fetch(`https://user-task-server-rouge.vercel.app/alltasks/${data._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.modifiedCount > 0) {
          setLikes(prev => prev + 1);
          setHasLiked(true);
          Swal.fire("Liked!", "You liked this task.", "success");
        } else {
          Swal.fire("Already Liked", "You've already liked this task.", "info");
          setHasLiked(true);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-16">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{data.category}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Budget</p>
            <p className="font-medium text-green-600">${data.budget}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium">{data.deadline}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Project Description</h3>
          <p className="text-gray-700">{data.description}</p>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={handleSubmit}
          disabled={hasLiked}
          className={`w-full ${hasLiked ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-lg transition duration-200`}
        >
          {hasLiked ? 'Already Bidded' : 'Bid Now'}
        </button>
        <p className="text-center mt-2 text-sm text-gray-600">Likes: {likes}</p>
      </div>
    </div>
  );
};

export default BidDetle;
