import React, { useState, useContext } from 'react';
import {
  Calendar, DollarSign, User, MapPin, Image, Phone, Info, CheckCircle, Plus
} from 'lucide-react';
import { AuthContext } from '../context/AuthProveider';
import { Helmet } from 'react-helmet';

const AddPak = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    tourName: '',
    image: '',
    duration: '',
    departureLocation: '',
    destination: '',
    price: '',
    departureDate: '',
    packageDetails: '',
    contactNo: '',
    email: user?.email
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some(value => !value)) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://tour-backend-five.vercel.app/api/v1/tour-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          guideName: user.displayName,
          guideEmail: user.email,
          guidePhoto: user.photoURL
        })
      });

      if (!response.ok) throw new Error('Failed to add package');

      setShowSuccess(true);
      setFormData({
        tourName: '',
        image: '',
        duration: '',
        departureLocation: '',
        destination: '',
        price: '',
        departureDate: '',
        packageDetails: '',
        contactNo: '',
        email: user?.email
      });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert('Failed to add package');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-800">
      <Helmet>
        <title>Add Pakej</title>
      </Helmet>
      <div className="max-w-lg w-full mx-auto pt-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Tour Package</h1>
        </div>

        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-300 text-sm">Package added successfully!</span>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            <InputField label="Tour Name" name="tourName" value={formData.tourName} onChange={handleChange} icon={<User className="w-4 h-4" />} placeholder="Cox's Bazar Tour" />
            <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} icon={<Image className="w-4 h-4" />} placeholder="https://image.com/tour.jpg" />

            <div className="grid grid-cols-2 gap-3">
              <InputField label="Duration" name="duration" value={formData.duration} onChange={handleChange} icon={<Calendar className="w-4 h-4" />} placeholder="3 Days" />
              <InputField label="Price" name="price" value={formData.price} onChange={handleChange} icon={<DollarSign className="w-4 h-4" />} type="number" placeholder="5000" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField label="From" name="departureLocation" value={formData.departureLocation} onChange={handleChange} icon={<MapPin className="w-4 h-4" />} placeholder="Dhaka" />
              <InputField label="To" name="destination" value={formData.destination} onChange={handleChange} icon={<MapPin className="w-4 h-4" />} placeholder="Cox's Bazar" />
            </div>

            <InputField label="Departure Date" name="departureDate" value={formData.departureDate} onChange={handleChange} icon={<Calendar className="w-4 h-4" />} type="date" />
            <InputField label="Contact" name="contactNo" value={formData.contactNo} onChange={handleChange} icon={<Phone className="w-4 h-4" />} placeholder="01700000000" />
            <InputField label="Details" name="packageDetails" value={formData.packageDetails} onChange={handleChange} icon={<Info className="w-4 h-4" />} isTextArea placeholder="Tour package details..." />

            {user && (
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Guide Info</h4>
                <div className="flex items-center space-x-3">
                  <img src={user.photoURL || 'https://via.placeholder.com/40'} alt="Guide" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{user.displayName || 'No Name'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email || 'No Email'}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add Package</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, icon, type = 'text', isTextArea = false, placeholder = '' }) => (
  <div>
    <label className="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-1 mb-1">
      {icon}
      <span>{label}</span>
    </label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        placeholder={placeholder}
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 text-sm rounded-lg px-3 py-2 focus:border-blue-400 dark:text-white focus:outline-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 text-sm rounded-lg px-3 py-2 focus:border-blue-400 dark:text-white focus:outline-none"
      />
    )}
  </div>
);

export default AddPak;
