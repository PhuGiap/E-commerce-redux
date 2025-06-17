import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../features/products/productList';
import ProductForm from '../features/products/ProductForm';

const AppRoutes = () => {
  return (
    <Routes>     
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<ProductForm />} />
      <Route path="/products/edit/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default AppRoutes;
