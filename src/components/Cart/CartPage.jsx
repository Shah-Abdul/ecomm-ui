import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // <-- ✅ import this!
import './CartPage.css';

const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate(); // <-- ✅ use this!

  const handleCheckout = () => {
    navigate('/checkout'); // 🚀 take the user to the checkout page
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div>{item.name}</div>
              <div>Qty: {item.quantity}</div>
              <div>₹{item.price}</div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
