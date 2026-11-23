import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { setAuthToken } from '../hooks/useApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('afrigold_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('afrigold_admin_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
  }, [token]);

  // Login securely through the Express Backend API
  // No Firebase or admin credentials exist in frontend code!
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token: authToken, user: userData } = res.data;

      setUser(userData);
      setToken(authToken);
      localStorage.setItem('afrigold_admin_user', JSON.stringify(userData));
      localStorage.setItem('afrigold_admin_token', authToken);
      setAuthToken(authToken);

      return userData;
    } catch (err) {
      const msg = err.response?.data?.error || 'Authentication failed. Please check credentials.';
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('afrigold_admin_user');
    localStorage.removeItem('afrigold_admin_token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
