import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from '../../UserHeader';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../../footer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function CategoryPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    const Addtocart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productExists = cart.find((item) => item._id === product._id);
        if (!productExists) {
            cart.push(product);
            toast.success(`${product.name} added to cart!`);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product/show');
                setProducts(response.data.existProduct || []); // Handle the case where `existProduct` might be undefined
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <UserHeader />
            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
                            <p className="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.</p>
                        </div>
                        <div>
                            <div className="mt-10">
                                <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Shop Collection</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-10 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-6">Category Products</h2>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        product.category ===  id ?
                            <div key={product._id} className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition relative flex flex-col" onClick={() => navigate(`/product/${product._id}`)}>
                                <img src={product.imageurl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                <h3 className="text-lg font-semibold">{product.name}</h3>

                                <div className="flex gap-1 text-center items-center mb-4 justify-between">
                                    <h6 className="text-base text-gray-600 font-semibold">
                                        ${product.discount >= 0 ? (product.price - (product.price * product.discount / 100)).toFixed(2) : product.price.toFixed(2)}
                                    </h6>
                                    {product.discount > 0 && (
                                        <span className="text-red-500 text-sm">
                                            <del>${product.price.toFixed(2)}</del>
                                        </span>
                                    )}
                                    <div className="mt-auto flex gap-4">
                                        <span className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition">
                                            <i className="fas fa-shopping-cart text-gray-700" onClick={(e) => { e.stopPropagation(); Addtocart(product); }}></i>
                                        </span>
                                        <span className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition">
                                            <i className="fas fa-heart text-gray-700"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            :""
                    ))}
                </div>
            </section>
       
            <Footer />
        </div>
    );
}

export default CategoryPage;
