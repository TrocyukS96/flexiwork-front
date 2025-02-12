"use client";

import { Registration } from "@/features/registration";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <Registration />
    </AuthLayout>
  );
}
