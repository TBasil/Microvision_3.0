// microvision-client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  // Get token and user from localStorage
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  // If no token, redirect to login
  if (!token) {
    console.log('🔒 No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If no user data, redirect to login
  if (!userStr) {
    console.log('🔒 No user data found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch (error) {
    console.log('🔒 Invalid user data, redirecting to login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check if user has that role
  if (requiredRole && user.role !== requiredRole) {
    console.log(`🔒 Access denied. Required: ${requiredRole}, User has: ${user.role}`);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // If pathologist, check if approved
  if (user.role === 'pathologist' && user.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Account Pending</h2>
          <p className="text-gray-600 mb-4">
            Your account is {user.status}. Please wait for admin approval.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected component
  console.log(`✅ Access granted for ${user.role}: ${user.email}`);
  return children;
};

export default ProtectedRoute;