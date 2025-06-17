// microvision-client/src/pages/Admin/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.full_name || 'Administrator'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👥</span>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Total Pathologists</h2>
                <p className="text-3xl font-bold text-blue-600 mt-1">54</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⏳</span>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Pending Approvals</h2>
                <p className="text-3xl font-bold text-yellow-500 mt-1">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Total Slides</h2>
                <p className="text-3xl font-bold text-green-600 mt-1">182</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-900">Dr. Smith uploaded a slide to "Lung Cancer"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-900">Dr. Ayesha registered and is pending approval</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-900">Dr. John shared a slide with Dr. Maria</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Manage Users</div>
            </div>
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">View Slides</div>
            </div>
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-medium">Analytics</div>
            </div>
          </button>
          <button className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Settings</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}