import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const CART_BASE_URL = "/cart-api/api/cart";
  const PRODUCT_BASE_URL = "/product-api/api/products"; // Update port if needed

  useEffect(() => {
    if (currentUser?._id) {
      fetchCart();
    }
  }, [currentUser]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${CART_BASE_URL}/${currentUser._id}`);
      const items = res.data.items || [];

      // Fetch product details for each cart item
      const detailedItems = await Promise.all(
        items.map(async (item) => {
          try {
            const productRes = await axios.get(`${PRODUCT_BASE_URL}/${item.productId}`);
            return {
              ...productRes.data,
              quantity: item.quantity,
            };
          } catch (err) {
            console.error("Error fetching product info:", err);
            return null;
          }
        })
      );

      // Filter out any null values if a product wasn't found
      setCartItems(detailedItems.filter(Boolean));
    } catch (err) {
      if (err.response?.status === 404) {
        setCartItems([]);
      } else {
        console.error("Error fetching cart:", err);
      }
    } finally {
      setLoading(false);
    }
  };

 const addToCart = async (product, quantityDelta = 1) => {
  if (!currentUser?._id) return;

  try {
    await axios.post(`${CART_BASE_URL}/${currentUser._id}`, {
      userId: currentUser._id,
      productId: product._id,
      quantity: quantityDelta,
    });
    fetchCart(); // Refresh the cart after update
  } catch (err) {
    console.error("Error updating cart:", err);
  }
};

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${CART_BASE_URL}/${currentUser._id}/${productId}`);
      fetchCart(); // Refresh cart after removal
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };


  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
