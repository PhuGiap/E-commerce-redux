import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from './userSlice';
import UserForm from './UserForm';

const UserList = () => {
  const dispatch = useDispatch();
  const { items: users, loading } = useSelector(state => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách người dùng</h2>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
      />

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border">Họ tên</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Cập nhật lúc</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  <img
                    src={user.image}
                    alt={user.name}
                    width="40"
                    height="40"
                    style={{ borderRadius: '50%' }}
                  />
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border text-sm text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString('vi-VN', {
                        hour12: false,
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-4">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal sửa/thêm user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <UserForm
              user={editUser}
              onClose={() => {
                setShowModal(false);
                setEditUser(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
