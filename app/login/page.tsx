"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { singInWithEmailAndPassword } from "../auth/actions";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const authData = await singInWithEmailAndPassword(data);
      console.log("Logged in successfully:", authData);
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark w-screen">
      <div className="bg-white/5 p-8 rounded-lg shadow-lg w-full max-w-md bg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login to Purple Box CRM
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="border border-primary-purple rounded-lg w-full p-2 bg-transparent"
                      enterKeyHint="next"
                      inputMode="email"
                      id="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="border border-primary-purple rounded-lg w-full p-2 bg-transparent"
                      enterKeyHint="done"
                      id="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              loading={isLoading}
              className="w-full bg-primary-purple hover:bg-primary-pink text-white"
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
