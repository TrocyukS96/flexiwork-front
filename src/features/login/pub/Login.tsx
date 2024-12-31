"use client";
import { useAuth } from "@/shared/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database")
  password: z.string().min(4),
});

export const Login = () => {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: z.infer<typeof formSchema>) => {
    login(e.email, e.password);
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
        <Button type="submit" className="w-full h-12 text-xs text-white bg-[#9433DC] hover:bg-[#9433DC]">Войти</Button>
      </form>
    </Form>
  );
};
