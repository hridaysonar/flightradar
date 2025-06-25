import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FlySkyFooter = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 border-t border-blue-200 dark:border-gray-700 py-10 text-gray-700 dark:text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

        {/* Logo & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold">⚡ FlySky</div>
          </div>
          <p className="font-semibold mb-1">Your Gateway to Global Travel</p>
          <p className="text-xs mb-2">
            Effortlessly discover and book flights, hotels, and packages around the globe.
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
            Empowering travelers to explore the world with ease.
          </p>

          <div className="flex justify-center md:justify-start space-x-3 mt-4 text-blue-600 dark:text-blue-400">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <Facebook size={18} />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Useful Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Flight Search</a></li>
            <li><a href="#" className="hover:underline">My Bookings</a></li>
            <li><a href="#" className="hover:underline">User Profile</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>✉️ info@flysky.com</li>
            <li>📞 +880 124-56890</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
        © 2025 <span className="text-blue-600 dark:text-blue-400">FlySky</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default FlySkyFooter;
