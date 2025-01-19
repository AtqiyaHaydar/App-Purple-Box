"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFrontendClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  avatar_url: z.string().optional(),
  email: z.string().email("Invalid email address."),
});

export default function ProfileForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = getSupabaseFrontendClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.user_metadata.full_name || "",
      avatar_url: user.user_metadata.avatar_url || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (data: { name: string; avatar_url: string }) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.name,
          avatar_url: data.avatar_url,
        },
      });

      if (error) throw error;

      router.refresh();

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white/5 text-white p-3 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Your Profile</h2>

        {/* <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <div className="flex flex-col justify-center-center gap-4">
                  <label htmlFor="avatar">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={field.value} />
                      <AvatarFallback>
                        {user?.email?.[0].toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </label>
                  <Input
                    {...field}
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="border-primary-purple " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} value={user.email} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" loading={isLoading} className="bg-primary-purple">
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
