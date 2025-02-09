"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACCESS_TOKEN } from "../constants";
import { useLoginMutation, useRegisterMutation } from "../api/queries/auth-queries";

interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginDto["user"] | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}

interface LoginDto {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string | null;
  };
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<LoginDto["user"] | null>(null);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const router = useRouter();

  const processRequest = (data:LoginDto) =>{
    if (data?.accessToken) {
      setUser(data.user);
      sessionStorage.setItem(ACCESS_TOKEN, `Bearer ${data?.accessToken}`);
      setIsAuthenticated(true);
      router.push("/");
    }
  }

  const login = (email: string, password: string) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data: AxiosResponse<LoginDto>) => {
          processRequest(data.data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      },
    );
  };

  const register = (email: string, password: string) => {
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: (data:AxiosResponse<LoginDto>) => {
          processRequest(data.data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      },
    );
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem(ACCESS_TOKEN);
    router.push("/login");
  };

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
      router.push("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
