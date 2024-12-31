"use client";

import { Registration } from "@/features/registration/pub/Registration";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <Registration />
    </AuthLayout>
  );
}
