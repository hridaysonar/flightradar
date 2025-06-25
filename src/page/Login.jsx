import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
import { app } from './Firebase';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import cartoonImg from '../assets/nav.png';
import { Helmet } from 'react-helmet';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [eyePosition, setEyePosition] = useState({ left: 0, top: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const moveX = (clientX / innerWidth - 0.5) * 8;
      const moveY = (clientY / innerHeight - 0.5) * 6;
      setEyePosition({ left: moveX, top: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccessMessage('Login successful!');
        toast.success('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      })
      .catch(() => {
        setError('Login failed! Please check your credentials.');
        toast.error('Login failed!');
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        setSuccessMessage('Google login successful!');
        toast.success('Google login successful!');
        setTimeout(() => navigate('/'), 1000);
      })
      .catch(() => {
        setError('Google login failed!');
        toast.error('Google login failed!');
        setIsLoading(false);
      });
  };

  const handlePasswordFocus = () => setEyePosition({ left: 0, top: -3 });
  const handlePasswordBlur = () => setEyePosition({ left: 0, top: 0 });
  const navigateToRegister = () => navigate('/register');

  const getCartoonExpression = () => {
    if (isLoading) return animationPhase === 0 ? 'scale-y-0' : '';
    if (error) return 'scale-y-75';
    return '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800 pt-16 px-4">
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl border-t-4 border-blue-500 transform transition-all hover:scale-[1.01]">
        <Helmet>
        <title>Login</title>
      </Helmet>
        {/* Decorative dots */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-500 rounded-full"></div>

        {/* Cartoon with eyes */}
        <div className="flex justify-center mb-8 relative">
          <div className={`transition-all duration-300 ${getCartoonExpression()}`}>
            <img src={cartoonImg} alt="Cartoon" className="w-28 h-28" />
          </div>
          <div
            className="absolute top-10 left-[40%] w-5 h-5 bg-black rounded-full transition-all duration-200"
            style={{ transform: `translate(${eyePosition.left}px, ${eyePosition.top}px)` }}
          ></div>
          <div
            className="absolute top-10 right-[40%] w-5 h-5 bg-black rounded-full transition-all duration-200"
            style={{ transform: `translate(${-eyePosition.left}px, ${eyePosition.top}px)` }}
          ></div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Password Input */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={password}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
              >
                {showPassword ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="bg-red-100 dark:bg-red-800 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 dark:text-red-100 text-sm">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 dark:bg-green-800 border-l-4 border-green-500 p-3 rounded">
              <p className="text-green-700 dark:text-green-100 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-300 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Login */}
        <div className="mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-medium border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 active:scale-[0.98] transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-base">Continue with Google</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-5">
          <p className="text-gray-600 dark:text-gray-300">Don't have an account?</p>
   <Link
  to="/register"
  className="mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
>
  Create Account
</Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
