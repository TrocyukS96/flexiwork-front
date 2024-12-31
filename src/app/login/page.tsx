"use client";

import { Login } from "@/features/login/pub/Login";
import AuthLayout from "@/shared/layouts/AuthLayout";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
