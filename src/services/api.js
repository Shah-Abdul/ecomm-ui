// src/services/api.js
import axios from 'axios';

const productApi = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 403 and we haven't retried yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await axios.post(
          '/auth-api/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        
        // If token refresh is successful, retry the original request
        if (response.data.accessToken) {
          // Update the auth header
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export async function fetchProducts(category = '', page = 1, search = '', limit = 10) {
  let url = `${productApi}/api/products?page=${page}&limit=${limit}`;

  if (category) url += `&category=${category}`;
  if (search) url += `&search=${search}`;

  const res = await fetch(url, {
    credentials: 'include', // Include cookies with the request
  });

  return res.json();
}

// Add product with authentication via cookies
export async function addProduct(product) {
  const res = await fetch(`${productApi}/api/products`, {
    method: 'POST',
    credentials: 'include', // Include cookies with the request
    body: product, // FormData — correct
  });

  return res.json();
}

// Delete product with authentication via cookies
export async function deleteProduct(productId) {
  const res = await fetch(`${productApi}/api/products/${productId}`, {
    method: 'DELETE',
    credentials: 'include', // Include cookies with the request
  });

  return res.json();
}

export default api;