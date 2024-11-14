import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);

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
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div className="font-sans bg-gradient-to-r from-blue-500 to-purple-500 text-black min-h-screen">
            {/* Header Hero Section */}
            <header className="flex items-center justify-between p-10">
                <div className="w-1/2">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
                    <p className="text-lg mb-6">Discover our amazing products that will enhance your life.</p>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded">Shop Now</button>
                </div>
                <div className="w-1/2">
                    <img src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Hero" className="w-full h-auto" />
                </div>
            </header>

    {/* Products Section */}
    <div className="bg-gradient-to-b from-white to-gray-100 py-16">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index) => (
                            <a href="#" className="group" key={index}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img src={product.imageurl} alt={product.name} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

    {/* Product Details Section */}



    <section className="flex p-10 bg-gradient-to-b from-white to-gray-200">
      <div className="m-12" 
      style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>
        <h2 className="text-2xl font-semibold mb-4">Product Title</h2>
        <p className="text-gray-700 mb-6">
          Detailed description of the product goes here. Highlight the features and benefits.
        </p>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Buy Now
        </button>
      </div>
      <div className="w-1/2 mr-2">
        <img
          src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg"
          alt="Product"
          className="w-50 h-auto"
        />
      </div>
    </section>

    {/* Featured Products Section */}
    <section className="p-10 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div className="border p-4 rounded" key={index}>
            <img
              src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg"
              alt="Featured Product"
              className="w-full h-auto mb-4"
            />
            <h3 className="text-lg font-semibold">Featured Product Title</h3>
            <p className="text-gray-600">$99.99</p>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="p-10 bg-gradient-to-b from-white to-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6">Testimonials</h2>
      <div className="flex flex-col items-center">
        <blockquote className="text-lg italic mb-4">
          "This product changed my life!"
        </blockquote>
        <cite className="font-semibold">- Happy Customer</cite>
      </div>
    </section>

        {/* Footer */}
        <footer className="bg-gray-200 p-6 text-center">
          <p className="text-gray-600">© 2024 Your Store. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default Home;
