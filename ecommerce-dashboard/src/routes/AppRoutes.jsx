import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import ProductList from '../features/products/productList';
import ProductForm from '../features/products/productForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<ProductForm />} />
      <Route path="/products/edit/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default AppRoutes;
