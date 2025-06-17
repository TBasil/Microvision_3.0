// microvision-client/src/pages/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'approved', 'pending', 'details'
  const [selectedPathologist, setSelectedPathologist] = useState(null);
  const [stats, setStats] = useState({
    totalApproved: 0,
    pending: 0,
    rejected: 0
  });
  const [approvedPathologists, setApprovedPathologists] = useState([]);
  const [pendingPathologists, setPendingPathologists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('token');

  // API base URL
  const API_BASE = 'http://localhost:5000/api';

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch approved pathologists
  const fetchApprovedPathologists = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/pathologists/approved`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setApprovedPathologists(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch approved pathologists');
      console.error('Error fetching approved pathologists:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending pathologists
  const fetchPendingPathologists = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/pathologists/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setPendingPathologists(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch pending pathologists');
      console.error('Error fetching pending pathologists:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pathologist details
  const fetchPathologistDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/pathologists/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setSelectedPathologist(data.data);
        setCurrentView('details');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch pathologist details');
      console.error('Error fetching pathologist details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update pathologist status
  const updatePathologistStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/pathologists/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (data.success) {
        // Refresh data
        await fetchStats();
        await fetchPendingPathologists();
        setCurrentView('pending'); // Go back to pending list
        setSelectedPathologist(null);
        alert(`Pathologist ${status} successfully!`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to update pathologist status');
      console.error('Error updating pathologist status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle card clicks
  const handleTotalPathologistsClick = () => {
    setCurrentView('approved');
    fetchApprovedPathologists();
  };

  const handlePendingApprovalsClick = () => {
    setCurrentView('pending');
    fetchPendingPathologists();
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPathologist(null);
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Load stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  // Render different views based on currentView state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            <strong>Error:</strong> {error}
          </div>
          <button 
            onClick={() => setError('')}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'approved':
        return renderApprovedPathologists();
      case 'pending':
        return renderPendingPathologists();
      case 'details':
        return renderPathologistDetails();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleTotalPathologistsClick}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Total Pathologists</h2>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.totalApproved}</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handlePendingApprovalsClick}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">⏳</span>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Pending Approvals</h2>
              <p className="text-3xl font-bold text-yellow-500 mt-1">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">❌</span>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Rejected</h2>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
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
    </>
  );

  const renderApprovedPathologists = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Approved Pathologists</h3>
        <button 
          onClick={handleBackToDashboard}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {approvedPathologists.length === 0 ? (
          <div className="px-6 py-4 text-center text-gray-500">
            No approved pathologists found
          </div>
        ) : (
          approvedPathologists.map((pathologist) => (
            <div 
              key={pathologist.id}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => fetchPathologistDetails(pathologist.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{pathologist.full_name}</h4>
                  <p className="text-sm text-gray-500">{pathologist.email}</p>
                  <p className="text-xs text-gray-400">{pathologist.hospital_institution}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(pathologist.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderPendingPathologists = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
        <button 
          onClick={handleBackToDashboard}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {pendingPathologists.length === 0 ? (
          <div className="px-6 py-4 text-center text-gray-500">
            No pending approvals
          </div>
        ) : (
          pendingPathologists.map((pathologist) => (
            <div 
              key={pathologist.id}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => fetchPathologistDetails(pathologist.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{pathologist.full_name}</h4>
                  <p className="text-sm text-gray-500">{pathologist.email}</p>
                  <p className="text-xs text-gray-400">{pathologist.hospital_institution}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(pathologist.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderPathologistDetails = () => {
    if (!selectedPathologist) return null;

    const isPending = selectedPathologist.status === 'pending';

    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Pathologist Details</h3>
          <button 
            onClick={() => setCurrentView(isPending ? 'pending' : 'approved')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to List
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPathologist.full_name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPathologist.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">License Number</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPathologist.license_number}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Professional Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hospital/Institution</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPathologist.hospital_institution}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Specialization</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPathologist.specialization}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedPathologist.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : selectedPathologist.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedPathologist.status.charAt(0).toUpperCase() + selectedPathologist.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Registration Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedPathologist.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {isPending && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Actions</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => updatePathologistStatus(selectedPathologist.id, 'approved')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : '✓ Approve'}
                </button>
                <button
                  onClick={() => updatePathologistStatus(selectedPathologist.id, 'rejected')}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : '✗ Reject'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
        {renderContent()}
      </div>
    </div>
  );
}