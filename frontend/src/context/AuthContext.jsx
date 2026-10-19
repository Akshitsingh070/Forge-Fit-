import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('forgefit_token') || '');
  const [isLoading, setIsLoading] = useState(true);

  // Check initial authentication
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('forgefit_token');
      if (storedToken) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            setProfile(res.profile);
          } else {
            // Invalid token
            localStorage.removeItem('forgefit_token');
            setToken('');
          }
        } catch (e) {
          console.warn('[Auth] Token check failed', e);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('forgefit_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (name, email, password) => {
    const res = await api.register({ name, email, password });
    if (res.success && res.token) {
      localStorage.setItem('forgefit_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const demoLogin = async () => {
    const res = await api.demoLogin();
    if (res.success && res.token) {
      localStorage.setItem('forgefit_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    }
    return { success: false, message: res.message || 'Demo login failed' };
  };

  const logout = () => {
    localStorage.removeItem('forgefit_token');
    setToken('');
    setUser(null);
    setProfile(null);
  };

  const updateProfileData = async (data) => {
    const res = await api.updateProfile(data);
    if (res.success && res.profile) {
      setProfile(res.profile);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await api.getMe();
      if (res.success) {
        setUser(res.user);
        setProfile(res.profile);
      }
    } catch (e) {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
        updateProfile: updateProfileData,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
