import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS
import Nav from '../Nav';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/product/create', { 
        name, 
        price, 
        imageurl, 
        discount, 
        category 
      });
      toast.success('Product created successfully!');
      // Reset form fields
      setName('');
      setImageUrl('');
      setPrice('');
      setDiscount('');
      setCategory('');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Nav />
      <div className="flex-1 ml-[270px] p-6 bg-gradient-to-b from-blue-50 to-white"> {/* Added margin left to accommodate sidebar */}
        <h2 className="text-3xl font-semibold mb-6">Create Product</h2>
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageurl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Discount (%)"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded flex items-center hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                Submit
              </button>
            </form>
          </CardBody>
        </Card>
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          pauseOnHover 
          draggable 
          pauseOnFocusLoss 
        />
      </div>
    </div>
  );
};

export default CreateProduct;
