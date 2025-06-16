import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import userReducer from '../features/users/userSlice';
import orderReducer from '../features/orders/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    orders: orderReducer,
  },
});

export default store;

export * from '../features/products/productSlice';
export * from '../features/users/userSlice';
export * from '../features/orders/orderSlice';