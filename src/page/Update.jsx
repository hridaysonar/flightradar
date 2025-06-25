import React, { useState, useContext, useEffect } from 'react';
import {
  Calendar, DollarSign, User, MapPin, Image, Phone, Info, CheckCircle, Plus
} from 'lucide-react';
import { AuthContext } from '../context/AuthProveider';
import { useParams, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2'; 
import { Helmet } from 'react-helmet';

const API_BASE_URL = 'https://tour-backend-five.vercel.app/api/v1';

const Update = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    tourName: '',
    image: '',
    duration: '',
    departureLocation: '',
    destination: '',
    price: '',
    departureDate: '',
    packageDetails: '',
    contactNo: ''
  });
  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tour-package/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch package details');
        }
        setFormData({
          tourName: data.data.tourName || '',
          image: data.data.image || '',
          duration: data.data.duration || '',
          departureLocation: data.data.departureLocation || '',
          destination: data.data.destination || '',
          price: data.data.price || '',
          departureDate: data.data.departureDate ? data.data.departureDate.substring(0, 10) : '',
          packageDetails: data.data.packageDetails || '',
          contactNo: data.data.contactNo || ''
        });
      } catch (err) {
        console.error("Error fetching package:", err);
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Failed to load package details: ${err.message}`,
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackageData();
    } else {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No package ID provided for update.',
      });
      navigate('/myCreate');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some(value => !value)) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields before updating.',
      });
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tour-package/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
        throw new Error(errorData.message || 'Failed to update package');
      }

      const responseData = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Update Successful!',
        text: responseData.message || 'Tour package updated successfully.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => navigate('/'));

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: err.message || 'An unexpected error occurred during update.',
      });
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8 text-lg text-violet-700 dark:text-violet-300">Loading package data...</p>;
  }

  if (error && !submitting && !formData.tourName) {
    return <p className="text-center text-red-600 dark:text-red-400 mt-8 text-lg">Error: {error}. Please try again.</p>;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <Helmet>
        <title>Update</title>
      </Helmet>
      <div className="max-w-3xl mx-auto pt-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Update Tour Package</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Tour Name" name="tourName" value={formData.tourName} onChange={handleChange} icon={<User className="w-4 h-4" />} placeholder="Cox's Bazar Tour" />
            <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} icon={<Image className="w-4 h-4" />} placeholder="https://image.com/tour.jpg" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Duration" name="duration" value={formData.duration} onChange={handleChange} icon={<Calendar className="w-4 h-4" />} placeholder="3 Days" />
              <InputField label="Price" name="price" value={formData.price} onChange={handleChange} icon={<DollarSign className="w-4 h-4" />} type="number" placeholder="5000" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="From" name="departureLocation" value={formData.departureLocation} onChange={handleChange} icon={<MapPin className="w-4 h-4" />} placeholder="Dhaka" />
              <InputField label="To" name="destination" value={formData.destination} onChange={handleChange} icon={<MapPin className="w-4 h-4" />} placeholder="Cox's Bazar" />
            </div>

            <InputField label="Departure Date" name="departureDate" value={formData.departureDate} onChange={handleChange} icon={<Calendar className="w-4 h-4" />} type="date" />
            <InputField label="Contact" name="contactNo" value={formData.contactNo} onChange={handleChange} icon={<Phone className="w-4 h-4" />} placeholder="01700000000" />
            <InputField label="Details" name="packageDetails" value={formData.packageDetails} onChange={handleChange} icon={<Info className="w-4 h-4" />} isTextArea placeholder="Tour package details..." />

            {user && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-200 mb-2">Guide Info</h4>
                <div className="flex items-center space-x-3">
                  <img src={user.photoURL || 'https://via.placeholder.com/40'} alt="Guide" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{user.displayName || 'No Name'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{user.email || 'No Email'}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Package</span>
              )}
            </button>
          </form>
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
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none text-gray-900 dark:text-gray-100"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none text-gray-900 dark:text-gray-100"
      />
    )}
  </div>
);

export default Update;
