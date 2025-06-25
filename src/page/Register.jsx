import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { app } from "./Firebase";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";

function Register() {
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [animationPhass, setAnimationPhase] = useState(0);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    calculateFormProgress();
  }, [name, photoURL, email, password, acceptedTerms]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const calculateFormProgress = () => {
    let progress = 0;
    if (name) progress += 20;
    if (photoURL) progress += 20;
    if (email) progress += 20;
    if (password) progress += 20;
    if (acceptedTerms) progress += 20;
    setFormProgress(progress);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success('Google login successful!');
        setTimeout(() => navigate('/'), 1000);
      })
      .catch(error => {
        toast.error('Google login failed');
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!acceptedTerms) {
      setError('You must accept the terms and conditions.');
      toast.error('You must accept the terms and conditions.');
      setLoading(false);
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one number, one lowercase letter, one uppercase letter, and be at least 6 characters long.');
      toast.error('Weak password');
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL
        });
      })
      .then(() => {
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Registration failed!');
      })
      .finally(() => setLoading(false));
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800 transition-all">
      <ToastContainer position="top-center" />
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-purple-500 transform transition-all hover:scale-[1.01]">
        {/* Decorative dots */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-500 rounded-full"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-400 rounded-full hidden md:block"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-400 rounded-full hidden md:block"></div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Start</span>
            <span>Complete</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Photo URL</label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                required
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="transform transition-all hover:scale-[1.02]">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Password must have a number, uppercase letter, lowercase letter, and be at least 6 characters.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-700 rounded cursor-pointer"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
              I accept the <span className="text-purple-600 hover:underline">Terms and Conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] ${(!acceptedTerms || loading) ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={!acceptedTerms || loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Creating Account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-sm py-3 px-5 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <FcGoogle className="text-2xl" />
          <span className="text-base">Continue with Google</span>
        </button>

        {/* Login Link */}
        <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-5 mt-5">
          <p className="text-gray-600 dark:text-gray-300">Already have an account?</p>
          <button 
            onClick={navigateToLogin}
            className="mt-2 text-purple-600 font-medium hover:text-purple-800 hover:underline transition-colors"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
