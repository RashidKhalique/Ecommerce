import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserHeader from '../../UserHeader';
import Footer from '../../footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import { useNavigate } from 'react-router-dom';


const ProductDetail = () => {
    const [Products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product/show');
                setProducts(response.data.existProduct || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);
    const navigate = useNavigate();
    const Addtocart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productExists = cart.find((item) => item._id === product._id);
        if (!productExists) {
            cart.push(product); 
            localStorage.setItem('cart', JSON.stringify(cart));
            toast.success(`${product.name} added to cart!`); // Notify on success
        }
        else{
          toast.info(`${product.name} is already in the cart.`); 
        }
    };

    return (
        <div>
            <ToastContainer /> {/* Make sure this is included */}
            <UserHeader />
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                    {Products.map((product, index) => (
                        product._id === id ? (
                            <div key={index} className="w-full flex gap-6">
                                <div className="w-full">
                                    <img
                                        src={product.imageurl} 
                                        alt={product.name} 
                                        className="w-full object-cover"
                                    />
                                    <div className="grid grid-cols-4 gap-2 mt-4">
                                        <img src={product.imageurl} alt={product.name} className="border" />
                                        <img src={product.imageurl} alt={product.name} className="border" />
                                        <img src={product.imageurl} alt={product.name} className="border" />
                                        <img src={product.imageurl} alt={product.name} className="border" />
                                    </div>
                                </div>

                                {/* Product details */}
                                <div className="w-full flex p-8 flex-col">
                                    <h2 className="text-2xl font-bold">{product.name}</h2>
                                    <p className="text-xl text-gray-600">${product.price}</p>
                                    <div className="flex items-center my-4">
                                        {/* Stars rating */}
                                        <div className="flex items-center text-yellow-400">
                                            ★★★★☆
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">Rating</span>
                                    </div>

                                    <p className="text-gray-700">
                                        The Zip Tote Basket is the perfect midpoint between shopping tote and stylish urban basket. Features plenty of pockets, durable canvas, and a zipper closure for added security.
                                    </p>

                                    <div className="mt-6">
                                        <button 
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700" 
                                            onClick={(e) => { e.stopPropagation(); Addtocart(product); }}
                                        >
                                            Add to bag
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>

                {/* Related products */}
                <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4">Customers also bought</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {Products.slice(0, 5).map((product, index) => (
                            <div key={index} className="border p-4"  onClick={() => navigate(`/product/${product._id}`)}>
                                <img src={product.imageurl} alt={product.name} className="w-full" />
                                <h4 className="mt-2 font-medium">{product.name}</h4>
                                <p className="text-gray-600">${product.price}</p>
                                <button 
                                    className="bg-indigo-600 text-white px-4 py-1 mt-2 rounded-lg hover:bg-indigo-700" 
                                    onClick={(e) => { e.stopPropagation(); Addtocart(product); }}
                                >
                                    Add to bag
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
