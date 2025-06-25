import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthProveider';
import { CheckCircle, Calendar, DollarSign, Mail, User, Send, Briefcase } from 'lucide-react';

const categories = [
  'Web Development',
  'Design',
  'Writing',
  'Marketing',
  'Data Analysis',
  'Mobile Development',
  'Other',
];

export default function AnimatedUpdateTask() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();  // get task id from URL

  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Animate form appear
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Load existing task data if editing
  useEffect(() => {
    if (!id) return; // no id means no update

    async function fetchTask() {
      try {
        const res = await fetch(`https://user-task-server-rouge.vercel.app/mytask/${id}`);
        if (!res.ok) throw new Error('Failed to fetch task');

        const data = await res.json();

        setFormData({
          title: data.title || '',
          category: data.category || '',
          description: data.description || '',
          deadline: data.deadline ? data.deadline.split('T')[0] : '', // format date YYYY-MM-DD
          budget: data.budget || '',
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load task data');
      }
    }

    fetchTask();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = fieldName => setActiveField(fieldName);
  const handleBlur = () => setActiveField(null);

  const getFieldClasses = fieldName =>
    `transform transition-all duration-300 ${activeField === fieldName ? 'scale-105 shadow-lg' : 'scale-100'}`;

  const handleSubmit = async e => {
    e.preventDefault();

    // Basic validation
    const { title, category, description, deadline, budget } = formData;
    if (!title || !category || !description || !deadline || !budget) {
      alert('Please fill in all required fields!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://user-task-server-rouge.vercel.app/mytask/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error(error);
      alert('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex justify-center items-start py-10 px-4 ">
      <div
        className={`bg-white shadow-2xl rounded-2xl w-full max-w-lg transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-8 relative overflow-hidden">
          <h1 className="text-4xl font-bold text-white text-center">Update Task</h1>
          <p className="text-indigo-100 text-center mt-2">Edit the details below to update your task</p>
        </div>

        {showSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex flex-col items-center justify-center z-20">
            <CheckCircle size={80} className="text-green-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-gray-800">Task Updated Successfully!</h3>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className={getFieldClasses('title')}>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <span>Task Title <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => handleFocus('title')}
              onBlur={handleBlur}
              placeholder="Enter a descriptive title"
              required
              className="w-full border border-indigo-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div className={getFieldClasses('category')}>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span className="w-5 h-5 text-indigo-500">📂</span>
              <span>Category <span className="text-red-500">*</span></span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => handleFocus('category')}
              onBlur={handleBlur}
              required
              className="w-full border border-indigo-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select task category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className={getFieldClasses('description')}>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span className="w-5 h-5 text-indigo-500">📝</span>
              <span>Description <span className="text-red-500">*</span></span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onFocus={() => handleFocus('description')}
              onBlur={handleBlur}
              placeholder="Describe the task..."
              rows={4}
              required
              className="w-full border border-indigo-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Deadline and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={getFieldClasses('deadline')}>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Deadline <span className="text-red-500">*</span></span>
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                onFocus={() => handleFocus('deadline')}
                onBlur={handleBlur}
                required
                className="w-full border border-indigo-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className={getFieldClasses('budget')}>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-5 h-5 text-indigo-500" />
                <span>Budget ($) <span className="text-red-500">*</span></span>
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onFocus={() => handleFocus('budget')}
                onBlur={handleBlur}
                min="0"
                step="0.01"
                required
                className="w-full border border-indigo-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Your Information</h3>
            <div className={`${getFieldClasses('email')} mb-3`}>
              <label className="text-xs font-medium text-gray-500 mb-1 flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className={getFieldClasses('name')}>
              <label className="text-xs font-medium text-gray-500 mb-1 flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 transition duration-300 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Updating...' : 'Update Task'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
