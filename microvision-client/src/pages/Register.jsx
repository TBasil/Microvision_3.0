import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    hospital_institution: '',
    license_number: '',
    specialization: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear password match error when either password field changes
    if ((name === 'password' || name === 'confirmPassword') && errors.passwordMatch) {
      setErrors({ ...errors, passwordMatch: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!form.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!form.hospital_institution.trim()) newErrors.hospital_institution = 'Hospital/Institution is required';
    if (!form.license_number.trim()) newErrors.license_number = 'License number is required';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (form.password && form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Password confirmation validation
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.passwordMatch = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          hospital_institution: form.hospital_institution,
          license_number: form.license_number,
          specialization: form.specialization
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || 'Registration successful! Your account is pending approval.');
        setForm({
          full_name: '',
          email: '',
          password: '',
          confirmPassword: '',
          hospital_institution: '',
          license_number: '',
          specialization: ''
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Handle validation errors from backend
        if (data.message.includes('Email address is already registered')) {
          setErrors({ email: data.message });
        } else {
          setErrors({ general: data.message });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Pathologist Registration
        </h2>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errors.general}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            disabled={loading}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword || errors.passwordMatch ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
          {errors.passwordMatch && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
          )}
        </div>

        {/* Hospital/Institution */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Hospital/Institution *
          </label>
          <input
            type="text"
            name="hospital_institution"
            value={form.hospital_institution}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.hospital_institution ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your hospital or institution name"
            disabled={loading}
          />
          {errors.hospital_institution && (
            <p className="text-red-500 text-sm mt-1">{errors.hospital_institution}</p>
          )}
        </div>

        {/* License Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Medical License Number *
          </label>
          <input
            type="text"
            name="license_number"
            value={form.license_number}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.license_number ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your medical license number"
            disabled={loading}
          />
          {errors.license_number && (
            <p className="text-red-500 text-sm mt-1">{errors.license_number}</p>
          )}
        </div>

        {/* Specialization */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your specialization (optional)"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
              disabled={loading}
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}