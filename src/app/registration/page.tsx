"use client"

import { useAuth } from "@/shared/contexts/AuthContext";
import { useRegisterMutation } from "@/shared/queries";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {register} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register(email,password)
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
        <button type="submit">Зарегеистрироваться</button>
      </form>
    </div>
    );
  }