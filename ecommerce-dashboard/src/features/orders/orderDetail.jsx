import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from './orderSlice';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const OrderDetail = ({ orderId, onClose }) => {
  const dispatch = useDispatch();
  const { selected: order } = useSelector(state => state.orders);
  const users = useSelector(state => state.users.items);
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (!order) return <p>Đang tải chi tiết...</p>;

  const user = users.find(u => u.id === order.userId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng #{order.id}</h2>
      <p><strong>Khách hàng:</strong> {user ? user.name : `User #${order.userId}`}</p>
      <p><strong>Ngày tạo:</strong> {formatDate(order.createdAt)}</p>
      <p><strong>Tổng tiền:</strong> {formatCurrency(order.totalPrice)}</p>

      <h3 className="mt-4 mb-2 text-lg font-semibold">Danh sách sản phẩm</h3>
      {order.productIds && order.productIds.length > 0 ? (
        <table className="w-full border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Hình ảnh</th>
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Giá</th>
            </tr>
          </thead>
          <tbody>
            {order.productIds.map(productId => {
              const product = products.find(p => p.id === productId);
              return (
                <tr key={productId} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    {product ? (
                      <img src={product.image} alt={product.title} className="h-16 object-contain mx-auto" />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="p-2 border">{product ? product.title : `Sản phẩm #${productId}`}</td>
                  <td className="p-2 border">{product ? formatCurrency(product.price) : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Không có sản phẩm trong đơn hàng.</p>
      )}

      <button
        onClick={onClose}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Đóng
      </button>
    </div>
  );
};

export default OrderDetail;
