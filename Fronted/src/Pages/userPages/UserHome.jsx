import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserHeader from '../../UserHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../footer';

function UserHome() {
  const Addtocart = (product) => {
     let cart;
  
    try {
      const storedCart = localStorage.getItem('cart');
      cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from local storage:', error);
      cart = [];
    }
  
    const productExists = cart.find((item) => item._id === product._id);
  
    if (!productExists) {
      // If product does not exist in the cart, add it
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart)); // Store updated cart
      toast.success(`${product.name} added to cart!`); // Toast notification
    } else {
      // Product already exists in the cart
      toast.info(`${product.name} is already in the cart.`); // Toast if product already exists
    }
  };
  
  

  const heroImage = 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14';
  const categories = [
    { name: 'Electronic Gadget', image: 'https://images.unsplash.com/photo-1618166080964-cdb5843979b0' },
    { name: 'Beauty & Makeup', image: 'https://images.unsplash.com/photo-1588186941286-724357304676' },
    { name: 'Home Stationary', image: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1700853010051-dce31802dafc' },
    { name: 'Peonic', image: 'https://plus.unsplash.com/premium_photo-1661413255121-aca7debee44d' },
  ];

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

  const navigate = useNavigate();



  return (
    <div>
      <UserHeader />
      {/* Hero Section */}
      <section className="flex items-center justify-between bg-gray-100 pl-20 pr-16">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold mb-4">Welcome to MyShop!</h2>
          <p className="mb-6 text-lg text-gray-700">
            Discover amazing products at unbeatable prices. Your shopping experience just got better!
          </p>
          <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-4" onClick={()=>{navigate('/ProductStore')}}>
              Shop Now
            </button>
            <button className="bg-transparent border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white" onClick={()=>{navigate('/ShopCart')}} >
              Check Cart
            </button>
          </div>
        </div>
        <div className="w-1/3">
          <img src={heroImage} alt="Hero" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            index<=7 ? (
              <div
                key={product._id}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition relative flex flex-col"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={product.imageurl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className='flex gap-1 text-center items-center mb-4 justify-between'>
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
                      <i
                        className="fas fa-shopping-cart text-gray-700"
                        onClick={(e) => { e.stopPropagation(); Addtocart(product); }}
                      ></i>
                    </span>
                    <span className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition">
                      <i className="fas fa-heart text-gray-700"></i>
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
      </section>

      {/* Promotional Section */}
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
                <div className="mt-8 inline-flex rounded-md shadow">
                  <a href="#" className="inline-flex items-center justify-center border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700">
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white border rounded-lg p-4 flex flex-col items-center" onClick={() => navigate(`/category/${category.name}`)} >
              <img src={category.image} alt={category.name} className="w-full h-64 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
  <div className="mx-auto max-w-2xl lg:max-w-4xl">
    
    <figure className="mt-10">
      <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
        <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”</p>
      </blockquote>
      <figcaption className="mt-10">
        <img className="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
          <div className="font-semibold text-gray-900">Judith Black</div>
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div className="text-gray-600">CEO of Workcation</div>
        </div>
      </figcaption>
    </figure>
  </div>
</section>

      {/* Toast Container */}
      <ToastContainer />

      {/* Footer */}
  
        <Footer/>
    
    </div>
  );
}

export default UserHome;
