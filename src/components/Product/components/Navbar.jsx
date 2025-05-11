import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import '../ProductStyle/Navbar.css';
import Modal from './Modal';
import { addProduct } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // ✅ For redirecting to cart

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAdd = async (product) => {
    try {
      await addProduct(product);
      closeModal();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="logo">E-Commerce</h1>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Products</Link>

          {currentUser ? (
            <>
              {/* 🛒 My Cart button */}
              <button onClick={() => navigate('/cart')} className="cart-button">
                My Cart
              </button>

              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>

              {currentUser.role === 'admin' && (
                <button onClick={openModal} className="add-product-button">
                  Add Product
                </button>
              )}
            </>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
      </div>

      {/* Modal for Add Product Form */}
      <Modal isOpen={isModalOpen} close={closeModal}>
        <AddProductForm onAdd={handleAdd} />
      </Modal>
    </nav>
  );
};

export default Navbar;
