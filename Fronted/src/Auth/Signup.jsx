import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Signup() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [showAdminPopup, setShowAdminPopup] = useState(false); // For displaying admin popup
  const [adminKey, setAdminKey] = useState(''); // Admin key entered by the user
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setMessage('');

    const payload = {
      name,
      email,
      password,
      role, 
    };

    try {
      const response = await axios.post('http://localhost:3000/api/signup', payload);
      setMessage(response.data.success ? `Success: ${response.data.message}` : `Error: ${response.data.message}`);
      toast.success("You're Signup Successfully")
      navigate('/login');
    } catch (error) {
      toast.error('You Can"t Signup Now');
    }
  };

  const handleAdminPopup = () => {
    setShowAdminPopup(true);
  };

  const handleAdminValidation = () => {
    if (adminKey === '#9122We') {
      setRole('admin');
      toast.success('Admin role assigned successfully.');
    } else {
      toast.error('Invalid Email Key')
    }
    setShowAdminPopup(false); // Close popup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              ref={nameRef}
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              ref={emailRef}
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              ref={passwordRef}
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
            >
              Sign Up
            </button>
            <button
              onClick={handleAdminPopup}
              type="button"
              className="w-1/2 px-4 py-2 ml-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
            >
              Admin
            </button>
          </div>
          <button onClick={() => navigate('/login')} className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 mt-4">
            Login
          </button>
          {message && (
            <div className={`mt-4 text-center ${message.startsWith('Success') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Admin Popup Modal */}
      {showAdminPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Enter Admin Key</h2>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Admin Key"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAdminValidation}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
              >
                Validate
              </button>
              <button
                onClick={() => setShowAdminPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
