// src/components/Checkout/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './CheckoutPage.css'; // 

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    // Mock placing order
    console.log('Order placed!', {
      items: cartItems,
      shippingAddress: address,
    });

    setOrderPlaced(true);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for shopping with us!</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <ul className="checkout-cart-list">
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} (Qty: {item.quantity}) - ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalPrice}</h3>

      <div className="form-group">
        <label>Shipping Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123, Street, City, Zip"
          rows={4}
        />
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
