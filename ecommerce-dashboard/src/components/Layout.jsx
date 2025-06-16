// src/components/Layout.jsx
import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/NavBar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="pt-20 px-6 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
