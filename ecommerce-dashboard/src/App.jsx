// src/App.jsx
import React from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

import ProductList from './features/products/productList';
import UserList from './features/users/userList';
import OrderList from './features/orders/orderList';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to Dashboard</h1>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/users" element={<UserList onEdit={() => {}} />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Layout>
  );
};

export default App;
