
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Corrected import path for types.
import { User } from '../types';
import { apiService } from '../services/apiService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Token is now primarily managed by apiService, this just triggers re-verification
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('streamix-token'));

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('streamix-token');
      if (storedToken) {
        try {
          const userData = await apiService.get<User>('/users/me');
          setUser(userData);
        } catch (error) {
          console.error("Token verification failed", error);
          localStorage.removeItem('streamix-token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  const handleAuthSuccess = (data: { token: string; user: User }) => {
      localStorage.setItem('streamix-token', data.token);
      setToken(data.token);
      setUser(data.user);
      navigate('/');
  }

  const login = async (email: string, password: string) => {
    const data = await apiService.post<any>('/auth/login', { email, password });
    handleAuthSuccess(data);
  };

  const register = async (email: string, username: string, password: string) => {
    const data = await apiService.post<any>('/auth/register', { email, username, password });
    handleAuthSuccess(data);
  };

  const logout = () => {
    localStorage.removeItem('streamix-token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('streamix-token') && !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};