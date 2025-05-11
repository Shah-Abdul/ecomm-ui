import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart(); // destructure both at once
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.productId || item._id} className="cart-item">
              <div>{item.name}</div>
              <div>Qty: {item.quantity}</div>
              <div>₹{item.price}</div>
              <div>Total: ₹{item.price * item.quantity}</div>
              <button
                className="icon-btn remove-cart"
                onClick={() => removeFromCart(item._id)}
                title="Remove from cart"
              >
                🗑️
              </button>
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
