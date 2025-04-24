// src/context/AuthContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginChecked = useRef(false);
  // Check if user is already logged in (on page load/refresh)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        loginChecked.current = true;
        const res = await api.get("/auth-api/auth/profile");
        setCurrentUser(res.data);
      } catch (err) {
        // User not logged in or token expired
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!loginChecked.current) {
      checkLoggedIn();
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setError(null);
      const response = await api.post("/auth-api/auth/register", userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setError(null);
      const response = await api.post("/auth-api/auth/login", credentials);
      setCurrentUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth-api/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post("/auth-api/auth/refresh-token");
      return response.data.accessToken;
    } catch (err) {
      console.error("Token refresh error:", err);
      setCurrentUser(null);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      error,
      register,
      login,
      logout,
      refreshToken,
    }),
    [currentUser, loading, error, register, login, logout, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
