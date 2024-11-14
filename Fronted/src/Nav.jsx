import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Nav = () => {
  const handleLogout = () => {
     localStorage.removeItem("admin");
    // window.location.reload();
    navigate('/login')
  }; 
  const navigate = useNavigate();
  return (
    <div className='w-30  '>
       <aside
        id="application-sidebar-brand"
        className="fixed top-0 left-0 h-screen flex-shrink-0 border-r-[1px] w-[270px] border-gray-400 bg-white transition-all duration-300"
      >
        <div className="p-5">
  <a className="text-nowrap" onClick={() => { navigate('/dashboard'); }}>
    <img 
      src="../public/logo.png" 
      alt="Logo-Dark" 
      width="150" // or any value you prefer
      height="150" // ensure height and width are equal for a perfect circle
      style={{ borderRadius: '50%' }} // applies the circular styling
    />
  </a>
</div>
        <div className="scroll-sidebar overflow-y-auto" data-simplebar="">
          <div className="px-6 mt-8">
            <nav className="w-full flex flex-col sidebar-nav">
              <ul id="sidebarnav" className="text-gray-600 text-sm">
                <li className="text-xs font-bold pb-4  cursor-default">
                  <span onClick={()=>{navigate('/dashboard')}} >HOME</span>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500  cursor-default"
                    onClick={()=>{navigate('/dashboard')}}
                  >
                    <i className="ti ti-layout-dashboard text-xl"></i>
                    <span >Dashboard</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500  cursor-default"
                    onClick={()=>{navigate('/products')}}
                  >
                    <i className="ti ti-package text-xl"></i>
                    <span>Products</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500 cursor-default"
                    onClick={()=>{navigate('/user')}}
                  >
                    <i className="ti ti-user text-xl"></i>
                    <span>User Management</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500 cursor-default"
                    onClick={()=>{navigate('/order')}}
                  >
                    <i className="ti ti-receipt text-xl"></i>
                    <span>Order Management</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500 cursor-default"
                    onClick={()=>{navigate('/CouponManager')}}
                  >
                    <i className="ti ti-truck text-xl"></i>
                    <span>Coupon</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={handleLogout}
                    className="sidebar-link gap-3 py-2 px-3 rounded-md w-full flex items-center hover:text-white-600 hover:bg-blue-500 cursor-default"
                  >
                    <i className="ti ti-login text-xl"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Nav
