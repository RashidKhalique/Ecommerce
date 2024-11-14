import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      const token = response.data.token;  
      localStorage.setItem('token', token);

      const userdata = response.data.signuserdata;
      localStorage.setItem('userdata', JSON.stringify(userdata)); // Convert object to a JSON string
      

      // Check if the login was successful and if the user is an admin
      if (response.data.success) {
        toast.success('You are logged in!');

        if (response.data.user.role === 'admin') {
          navigate('/dashboard');
          localStorage.setItem('admin',token)
       
        } else {
          navigate('/');
        }
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      toast.error('User or Password is incorrect');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => { navigate('/signup') }}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Signup
          </button>
          {message && (
            <div className={`mt-4 text-center ${message.startsWith('Success') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
        </form>
      </div>


      <ToastContainer />
    </div>
  );
}

export default Login;
