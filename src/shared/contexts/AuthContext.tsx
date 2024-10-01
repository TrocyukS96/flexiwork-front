"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useFetchSession, useLoginMutation, useRegisterMutation } from '../queries';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const fetchSessionQuery = useFetchSession()
  const router = useRouter();

  const login = (email: string, password: string) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setUser('data.user');
          setIsAuthenticated(true);
          // localStorage.setItem('user', data.user);
          // localStorage.setItem('token', data.token);
          router.push('/');
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      }
    );
  };

  const register = (email: string, password: string) => {
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setUser('data.user');
          setIsAuthenticated(true);
          // localStorage.setItem('user', data.user);
          // localStorage.setItem('token', data.token);
          router.push('/');
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      }
    );
  };

  const fetchSession = () =>{
    
  }

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login,register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
