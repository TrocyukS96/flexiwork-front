"use client"; 

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "./input";

interface PasswordInputProps extends InputProps {}

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Введите пароль"
        className={`pr-10 ${className}`}
        {...props}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {showPassword ? (
          <Eye className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeOff className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};
