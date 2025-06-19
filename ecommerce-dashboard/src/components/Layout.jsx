// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/NavBar';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="h-full flex fixed top-0 left-0 right-0 w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 bg-white transition-all duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 flex
        `}
      >
        <Sidebar setSidebarOpen={() => setSidebarOpen(false)} />
        <div className={`h-20 flex items-center px-5 text-white absolute md:hidden`}>
          <FaXmark size={24} onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </div>


      {/* Nội dung chính */}
      <div className="flex-1 w-full">
        {/* Navbar */}
        <div className="flex items-center gap-3 justify-between px-4 py-3 md:px-0 md:py-0 bg-white shadow-md ">
          {/* Toggle Sidebar Button on Mobile */}
          <button className='md:hidden' onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBarsStaggered size={24} />
          </button>
          <Navbar />
        </div>

        {/* Nội dung */}
        <main className="bg-gray-100 h-full px-3 pb-20 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
