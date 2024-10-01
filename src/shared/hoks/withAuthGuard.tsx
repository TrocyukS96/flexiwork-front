"use client"
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const WithAuth: React.FC<AuthGuardProps> = ({ children }) => {
  const context = useContext(AuthContext);
  const router = useRouter();

  React.useEffect(() => {
    if (!context?.isAuthenticated) {
      router.push('/login'); // Перенаправляем на страницу входа, если не аутентифицирован
    }
  }, [context, router]);

  // Пока идет перенаправление или аутентификация, можно показывать загрузку
  if (!context?.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default WithAuth;
