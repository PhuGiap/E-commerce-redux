import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderStatus } from './orderSlice';
import OrderDetail from './orderDetail';

const statusStyles = {
  pending: 'bg-yellow-200 text-yellow-800',
  processing: 'bg-blue-200 text-blue-800',
  shipped: 'bg-purple-200 text-purple-800',
  delivered: 'bg-green-200 text-green-800',
};


const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const getNextStatus = (current) => {
  const statusFlow = ['pending', 'processing', 'shipped', 'delivered'];
  const index = statusFlow.indexOf(current);
  return index < statusFlow.length - 1 ? statusFlow[index + 1] : current;
};

const OrderList = () => {
  const dispatch = useDispatch();
  const { items: orders, loading: ordersLoading } = useSelector(state => state.orders);
  const { items: users, loading: usersLoading } = useSelector(state => state.users);
  const { loading: productsLoading } = useSelector(state => state.products);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());

  }, [dispatch]);

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User #${userId}`;
  };

  const handleStatusChange = (order) => {
    const nextStatus = getNextStatus(order.status);
    if (nextStatus !== order.status) {
      const updatedOrder = { ...order, status: nextStatus };  // giữ nguyên các trường khác
      dispatch(updateOrderStatus({ id: order.id, data: updatedOrder }));
    }
  };

  if (ordersLoading || usersLoading || productsLoading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
      <div class="relative overflow-x-auto">
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Ngày tạo</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border">#{order.id}</td>
                <td className="p-2 border">{getUserName(order.userId)}</td>
                <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                <td
                  className={`p-2 border capitalize font-semibold rounded text-center ${statusStyles[order.status] || ''}`}
                >
                  {order.status}
                </td>
                <td className="p-2 border">{formatCurrency(order.totalPrice)}</td>
                <td className="p-2 border">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    {order.status !== 'delivered' && (
                      <button
                        onClick={() => handleStatusChange(order)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Chuyển sang "{getNextStatus(order.status)}"
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-4">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem chi tiết */}
      {selectedOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedOrderId(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <OrderDetail
              orderId={selectedOrderId}
              onClose={() => setSelectedOrderId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
