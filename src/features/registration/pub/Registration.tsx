"use client";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database")
  password: z.string().min(4),
  confirmPassword: z.string().min(4),


}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // Ошибка будет указана в поле confirmPassword
});



export const Registration = () => {
  const { register } = useAuth();
  const pathname = usePathname();

  console.log(pathname)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (e: z.infer<typeof formSchema>) => {
    register(e.email, e.password);
  };

  const formLabelClass = `
    text-xs text-white
    `;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelClass}>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Text'
                  {...field}
                  className="h-12 text-xs text-black bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelClass}>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Text"
                  {...field}
                  className="h-12 text-xs text-black bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelClass}>Повторить пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Text"
                  {...field}
                  className="h-12 text-xs text-black bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-xs text-white bg-[#9433DC] hover:bg-[#9433DC]">Зарегистрироваться</Button>
      </form>
    </Form>
  );

  return (
    <div>
      {/* <h1>Вход</h1> */}
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </div>
  );
};
