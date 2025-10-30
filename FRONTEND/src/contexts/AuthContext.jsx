import React, { createContext, useContext, useState, useCallback } from 'react';
import * as authService from '../api/auth/authService';

export const AuthContext = createContext();

function decodeJWT(token) {
  try {
    const part = token.split('.')[1];
    const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ezpay_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem('ezpay_user');
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const payload = await authService.login(credentials);
      const token = payload.token;
      localStorage.setItem('ezpay_token', token);
      localStorage.setItem('ezpay_user', JSON.stringify(payload.user));
      setUser(payload.user);
      return payload.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Error during logout:', error);
    }

    localStorage.removeItem('ezpay_token');
    localStorage.removeItem('ezpay_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updates };
      localStorage.setItem('ezpay_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);