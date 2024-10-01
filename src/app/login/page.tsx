"use client";

import React, { useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Используем хук useAuth для получения функций контекста

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (login) {
      try {
        await login(email, password);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
        <div>
          <Link href={"/registration"}>Зарегеистрироваться?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
