import axiosInstance from '../axios/axiosInstance';
import { ENDPOINTS } from '../endpoint';

export const fetchUsers = () => axiosInstance.get(ENDPOINTS.users.getAll);

export const fetchUserById = (id) => axiosInstance.get(ENDPOINTS.users.getById(id));

export const addUser = (data) => axiosInstance.post(ENDPOINTS.users.create, data);

export const updateUser = (id, data) => axiosInstance.put(ENDPOINTS.users.update(id), data);

export const deleteUser = (id) => axiosInstance.delete(ENDPOINTS.users.delete(id));
