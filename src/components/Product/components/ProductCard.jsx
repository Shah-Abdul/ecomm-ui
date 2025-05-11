import React, { useState } from 'react';
import '../ProductStyle/ProductCard.css';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';

const ProductCard = ({ product, onDelete, role }) => {
  const [showCartControls, setShowCartControls] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { currentUser } = useAuth();
  const { addToCart, removeFromCart } = useCart();

  const handleCartClick = () => {
    setShowCartControls(true);
    setQuantity(1);
    addToCart(product, 1);
  };

  const increment = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
      addToCart(product, 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      addToCart(product, -1);
    } else {
      handleRemoveFromCart();
    }
  };

  const handleRemoveFromCart = () => {
    setShowCartControls(false);
    setQuantity(0);
    removeFromCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image ? `/product-api/${product.image}` : '/default-image.jpg'}
          alt={product.name}
          className="product-image"
        />

        {!showCartControls && (
          <button className="cart-icon-btn" onClick={handleCartClick}>🛒</button>
        )}

        {showCartControls && (
          <div className="cart-control-box">
            <button className="icon-btn" onClick={decrement}>➖</button>
            <span className="quantity-display">{quantity}</span>
            <button className="icon-btn" onClick={increment}>➕</button>
            <button
              className="icon-btn remove-cart"
              onClick={handleRemoveFromCart}
              title="Remove from cart"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-stock">In Stock: {product.stock}</p>

        {currentUser?.role === 'admin' && (
          <button onClick={() => onDelete(product._id)} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
