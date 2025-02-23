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
import toast from "react-hot-toast";
import { useLoginMutation, useRegisterMutation } from "../api/queries/auth-queries";
import { ACCESS_TOKEN, routes } from "../constants";
import { useStore } from "../store/store";
import { LoginDto } from "../types/dto";

interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginDto["user"] | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}



export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {setLoading} = useStore((state) => state);
  const [user, setUser] = useState<LoginDto["user"] | null>(null);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const router = useRouter();

  const processRequest = (data:LoginDto) =>{
    if (data?.accessToken) {
      setUser(data.user);
      sessionStorage.setItem(ACCESS_TOKEN, `Bearer ${data?.accessToken}`);
      setIsAuthenticated(true);
      router.push(routes.HOME);
    }
  }

  const login = (email: string, password: string) => {
    setLoading(true)
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data: AxiosResponse<LoginDto>) => {
          processRequest(data.data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error('Что-то пошло не так')
        },
        onSettled:()=>{
          setLoading(false)
        }
      },
    );
  };

  const register = (email: string, password: string) => {
    setLoading(true)
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: (data:AxiosResponse<LoginDto>) => {
          processRequest(data.data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error('Что-то пошло не так')
        },
        onSettled:()=>{
          setLoading(false)
        }
      },
    );
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem(ACCESS_TOKEN);
    router.push(routes.LOGIN);
  };

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
      router.push(routes.HOME);
    }
  }, [router]);

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
