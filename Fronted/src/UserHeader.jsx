import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserHeader() {
  const [length, setlength] = useState(0)
  const userData = localStorage.getItem("userdata");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    toast.success("Logout Successfully"); 
    window.location.href = 'http://localhost:5173/'; 
  };
  

  useEffect(() => {
    var cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
      setlength(cart.length)
    } else {
      localStorage.setItem('cart', [])
    }


  }, []);


  return (
    <div>
      <div className="bg-white">

        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $1000</p>

          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>


                <div className="ml-4 flex lg:ml-0">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                  </a>
                </div>


                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">

                   <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer" onClick={() => navigate('/')}>Home</a>
                    <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer" onClick={() => navigate('/ShopCart')}>Cart</a>
                    <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer" onClick={() => navigate('/ProductStore')}>Stores</a>
                    <a className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer" onClick={() => navigate('/UserOrderTracking')}>Track Order</a>

                  </div>
                </div> 

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <>
                       <span className="text-sm font-medium text-gray-700 cursor-pointer">Welcome, {user.name}</span>
                       <span className="text-sm font-medium text-gray-700 cursor-pointer" onClick={logout}>Logout</span>

                    </>
             
            ) : (
                <>
      

                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800" onClick={()=>navigate('/login')}>Sign in</a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800" onClick={()=>navigate('/signup')}>Create account</a>
                </>
            )}
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                      <img src="https://tailwindui.com/plus/img/flags/flag-canada.svg" alt="" className="block h-auto w-5 flex-shrink-0" />
                      <span className="ml-3 block text-sm font-medium">CAD</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>

                  <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </a>
                  </div>

                  <div className="ml-4 flow-root lg:ml-6">
                    <a className="group -m-2 flex items-center p-2" >
                      <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" onClick={() => navigate('/ShopCart')}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{length}</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default UserHeader
