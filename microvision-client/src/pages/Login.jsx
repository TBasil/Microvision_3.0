// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true); // START loading

    try {
      // API call to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Login successful
        console.log('Login successful:', data);
        
        // Store JWT token (you might want to use localStorage or context)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate based on user role
        if (data.user.role === 'admin') {
          console.log('Admin login');
          navigate('/admin/dashboard');
        } else if (data.user.role === 'pathologist') {
          console.log('Pathologist login');
          navigate('/dashboard');
        }
      } else {
        // ERROR: Login failed
        if (data.message && data.message.includes('pending')) {
          setError('Your account is pending approval. Please wait for admin approval.');
        } else if (data.message && data.message.includes('rejected')) {
          setError('Your account has been rejected. Please contact admin.');
        } else {
          setError(data.message || 'Invalid email or password');
        }
      }
    } catch (error) {
      // NETWORK ERROR: Server down or connection issue
      console.error('Login error:', error);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false); // STOP loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
          disabled={isLoading} // Disable during loading
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
          disabled={isLoading} // Disable during loading
        />

        <button
          type="submit"
          disabled={isLoading} // Disable button during loading
          className={`w-full py-2 rounded transition ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isLoading ? 'Logging in...' : 'Login'} {/* Dynamic button text */}
        </button>
      </form>
    </div>
  );
}