// src/components/Orders/OrdersPage.jsx
import React, { useEffect, useState } from 'react';
import './Orderpage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Simulate fetching orders
  useEffect(() => {
    const dummyOrders = [
      {
        id: 'order1',
        date: '2025-05-10',
        items: [
          { name: 'Test Product', quantity: 1, price: 999 },
        ],
        total: 999,
        shippingAddress: '123, Street, City, Zip',
      },
    ];

    setOrders(dummyOrders);
  }, []);

  if (orders.length === 0) {
    return <div className="orders-page"><p>No orders yet 💤</p></div>;
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>
          <p>Date: {order.date}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - Qty: {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>
          <strong>Total: ₹{order.total}</strong>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
