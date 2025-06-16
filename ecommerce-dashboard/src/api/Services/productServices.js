import axiosInstance from '../axios/axiosInstance';
import { ENDPOINTS } from '../endpoint';

export const fetchProducts = () => axiosInstance.get(ENDPOINTS.products.getAll);

export const fetchProductById = (id) =>
  axiosInstance.get(ENDPOINTS.products.update(id));

export const addProduct = (data) =>
  axiosInstance.post(ENDPOINTS.products.create, data);

export const updateProduct = (id, data) =>
  axiosInstance.put(ENDPOINTS.products.update(id), data);

export const deleteProduct = (id) =>
  axiosInstance.delete(ENDPOINTS.products.delete(id));
