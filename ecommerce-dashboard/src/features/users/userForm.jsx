// src/features/users/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, addUser } from './userSlice';

const UserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    image: '',
    createdAt: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        image: user.image || '',
        createdAt: user.createdAt || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    if (user) {
      dispatch(updateUser({ id: user.id, data: dataToSave }));
    } else {
      dispatch(addUser(dataToSave));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">
        {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
      </h3>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Họ tên"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Link ảnh đại diện"
        required
        className="w-full p-2 border rounded"
      />

      {/* Hiển thị preview hình ảnh nếu có */}
      {formData.image && (
        <div className="mt-2">
          <img
            src={formData.image}
            alt="Ảnh người dùng"
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>
      )}

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">-- Chọn vai trò --</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
      </select>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default UserForm;
