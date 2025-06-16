// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        MyShop
      </div>
      <nav className="mt-4">
        <ul className="flex flex-col gap-2 px-4">
          <li>
            <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700 text-left">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="block px-4 py-2 rounded hover:bg-gray-700 text-left">
              Products
            </Link>
          </li>
          <li>
            <Link to="/users" className="block px-4 py-2 rounded hover:bg-gray-700 text-left">
              Users
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block px-4 py-2 rounded hover:bg-gray-700 text-left">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-700 text-left">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
