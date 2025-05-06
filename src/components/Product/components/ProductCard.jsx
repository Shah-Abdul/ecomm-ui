import React, { useState } from 'react';
import '../ProductStyle/ProductCard.css';
import { useAuth } from '../../../context/AuthContext';


const ProductCard = ({ product, onDelete, role, onAddToCart, onRemoveFromCart }) => {
  const [showCartControls, setShowCartControls] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { currentUser } = useAuth();
  console.log('Card'+JSON.stringify(currentUser));

  const handleCartClick = () => {
    setShowCartControls(true);
    setQuantity(1);
    onAddToCart(product, 1); // Add first unit to cart
  };

  const increment = () => {
    if (quantity < product.stock) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onAddToCart(product, newQty);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onAddToCart(product, newQty);
    } else {
      handleRemoveFromCart(); // If quantity becomes 0
    }
  };

  const handleRemoveFromCart = () => {
    setShowCartControls(false);
    setQuantity(0);
    onRemoveFromCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image ? `/product-api//${product.image}` : '/default-image.jpg'}
          alt={product.name}
          className="product-image"
        />

        {!showCartControls && (
          <button className="cart-icon-btn" onClick={handleCartClick}>
            🛒
          </button>
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
