import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Nav';
import { useParams } from 'react-router-dom';

const updateProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { id } = useParams();

  const resetForm = () => {
    setName('');
    setImageUrl('');
    setPrice('');
    setDiscount('');
    setCategory('');
    setSelectedProductId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProductId) {
        await axios.put(`http://localhost:3000/api/product/edit/${selectedProductId}`, { 
          name, 
          price, 
          imageurl, 
          discount, 
          category 
        });
        toast.success('Product updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/product/create', { 
          name, 
          price, 
          imageurl, 
          discount, 
          category 
        });
        toast.success('Product created successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/show');
      setProducts(response.data.existProduct || []);
      if (id) {
        const productToEdit = response.data.existProduct.find(product => product._id === id);
        if (productToEdit) {
          setSelectedProductId(productToEdit._id);
          setName(productToEdit.name);
          setImageUrl(productToEdit.imageurl);
          setPrice(productToEdit.price);
          setDiscount(productToEdit.discount);
          setCategory(productToEdit.category);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Nav />
      <div className="flex-1 ml-[270px] p-6 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-semibold mb-6">{selectedProductId ? 'Update Product' : 'Create Product'}</h2>
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <CardBody>
            {selectedProductId ? (
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
                  {selectedProductId ? 'Update' : 'Submit'}
                </button>
              </form>
            ) : (
              <p>Product not found.</p>
            )}
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

export default updateProduct;
