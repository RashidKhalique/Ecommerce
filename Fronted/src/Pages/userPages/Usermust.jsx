
import React from 'react';

const Usermust = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">You must log in</h2>
        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Usermust;
