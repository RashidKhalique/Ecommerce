import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Products */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Products</h3>
          <ul>
            <li>Bags</li>
            <li>Tees</li>
            <li>Objects</li>
            <li>Home Goods</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul>
            <li>Who we are</li>
            <li>Sustainability</li>
            <li>Press</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
          <ul>
            <li>Contact</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Warranty</li>
            <li>Secure Payments</li>
            <li>FAQ</li>
            <li>Find a store</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Sign up for our newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            The latest deals and savings, sent to your inbox weekly.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 p-2 border border-gray-400 rounded-l"
            />
            <button className="bg-blue-600 text-white p-2 rounded-r">Sign up</button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        &copy; 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
