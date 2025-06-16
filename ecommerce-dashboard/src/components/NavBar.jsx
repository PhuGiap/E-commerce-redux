// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hi, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Navbar;
