import React from 'react';
import ProductForm from '../features/products/productForm';
import ProductList from '../features/products/productList';

const Dashboard = () => {
  return (
    <div>
      <h1>Trang Quản lý Sản phẩm</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default Dashboard;
