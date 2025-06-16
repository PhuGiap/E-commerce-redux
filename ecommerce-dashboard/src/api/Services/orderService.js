import axiosInstance from '../axios/axiosInstance';
import { ENDPOINTS } from '../endpoint';

export const fetchOrders = () => axiosInstance.get(ENDPOINTS.orders.getAll);
export const fetchOrderById = (id) => axiosInstance.get(ENDPOINTS.orders.getOne(id));
export const updateOrder = (id, data) => axiosInstance.put(ENDPOINTS.orders.updateStatus(id), data);
export const deleteOrder = (id) => axiosInstance.delete(ENDPOINTS.orders.delete(id));

