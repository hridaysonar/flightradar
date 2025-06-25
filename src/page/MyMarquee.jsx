import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../context/AuthProveider";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Seriously impressed. Highly recommended.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm absolutely loving this! Well done.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "Top-notch work. Really glad I found this.",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({ img, name, username, body }) => (
  <div className="review-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-64 mx-4 shadow hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{username}</p>
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{body}</p>
  </div>
);

const MyMarquee = () => {
  const { user } = useContext(AuthContext);

  const currentUserReview = user
    ? [{
        name: user.displayName || "Anonymous",
        username: user.email || "@user",
        body: "This is my own dashboard. Loving the experience!",
        img: user.photoURL || "https://via.placeholder.com/40",
      }]
    : [];

  const allReviews = [...currentUserReview, ...reviews];
  const midIndex = Math.ceil(allReviews.length / 2);
  const firstRow = allReviews.slice(0, midIndex);
  const secondRow = allReviews.slice(midIndex);

  return (
    <div className="relative w-full py-10 overflow-hidden bg-gray-50 dark:bg-black mt-20">
      <style>{`
        @keyframes borderPulse {
          0%, 100% {
            border-color: #e5e7eb;
          }
          50% {
            border-color: #3b82f6;
          }
        }
        .review-card {
          animation: borderPulse 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* First Marquee Row */}
      <Marquee gradient={false} speed={40} pauseOnHover>
        {firstRow.map((review, idx) => (
          <ReviewCard key={`row1-${idx}`} {...review} />
        ))}
      </Marquee>

      {/* Second Marquee Row */}
      <Marquee gradient={false} speed={40} direction="right" pauseOnHover>
        {secondRow.map((review, idx) => (
          <ReviewCard key={`row2-${idx}`} {...review} />
        ))}
      </Marquee>

      {/* Gradient Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10" />
    </div>
  );
};

export default MyMarquee;
