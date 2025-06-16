// src/pages/OrderManagement.jsx
import React, { useState } from 'react';
import OrderList from '../features/orders/OrderList';
import OrderDetail from '../features/orders/OrderDetail';

const OrderManagement = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div>
      {selectedOrderId ? (
        <OrderDetails orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
      ) : (
        <OrderList onView={setSelectedOrderId} />
      )}
    </div>
  );
};

export default OrderManagement;
