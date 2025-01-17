"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function FacebookLoginPage() {
  return (
    <div className="flex flex-col w-1/2 gap-5 bg-transparent text-white">
      <h1 className="p-3 text-3xl font-bold">Facebook Login Page</h1>

      <div className="flex flex-col w-full gap-5 p-5 bg-transparent rounded-lg shadow-md">
        <Label>Email</Label>
        <Input type="email" />
        <Label>Password</Label>
        <Input type="password" />
        <Button className="bg-primary-purple">Login</Button>
      </div>
    </div>
  );
}
