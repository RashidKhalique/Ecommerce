import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let [totalProducts, setTotalProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/show');
        setProducts(response.data.existProduct || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/delete/${id}`);
      // Filter out the deleted product from the state
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[270px] border-r-[1px] border-gray-400 bg-white">
        <Nav />
      </div>

      {/* Main Content */}
      <div className="ml-[270px] flex-1 p-6">
        {/* Top Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {products.map((product, index) => (
            index <= 2 ? (
              <div key={index} className="card overflow-hidden">
                <div className="relative">
                  <a href="">
                    <img src={product.imageurl} alt={product.name} className="w-full" />
                  </a>
                  <a href="" className="bg-blue-600 w-8 h-8 flex justify-center items-center text-white rounded-full absolute bottom-0 right-0 mr-4 -mb-3">
                    <i className="ti ti-basket text-base"></i>
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="text-base font-semibold text-gray-600 mb-1">{product.name}</h6>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <h6 className="text-base text-gray-600 font-semibold">${product.discount >= 0 ? product.price - (product.price * product.discount / 100) : product.price}</h6>
                        {
                          product.discount>0 ?
                          <span className="text-gray-500 text-sm"><del>${product.price}</del></span> : ""
                        }
                    
                    </div>
                  </div>
                </div>
              </div>
            ) : ""
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold mb-6 text-left">All Products</h2>
          <button onClick={() => navigate('/create')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Create Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-gray-600">Image</th>
                <th className="py-2 px-4 text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-gray-600">Price</th>
                <th className="py-2 px-4 text-gray-600">Category</th>
                <th className="py-2 px-4 text-gray-600">Discount</th>
                <th className="py-2 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">
                    <img src={product.imageurl} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.discount >= 0 ? product.price - (product.price * product.discount / 100) : product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.discount}%</td>
                  <td className="py-2 px-4 space-x-2">
                    <FontAwesomeIcon 
                      icon={faEdit} 
                      className="text-blue-500 cursor-pointer" 
                      onClick={() => navigate(`/edit/${product._id}`)} // Navigate to the edit page
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteProduct(product._id)}
                    />
                  </td>

                </tr>
             )) }
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-2 px-4 text-center">No products added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
