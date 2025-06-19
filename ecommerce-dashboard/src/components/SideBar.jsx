// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setSidebarOpen }) => {

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white top-0 left-0 shadow-lg">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        MyShop
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-4">
          <li>
            <Link to="/products" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={setSidebarOpen}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/users" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={setSidebarOpen}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={setSidebarOpen}>
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
