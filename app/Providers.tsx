"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function Providers({
  image_url,
  username,
}: {
  image_url: string;
  username: string;
}) {
  const pathname = usePathname();
  if (pathname == "/login") {
    return null;
  }
  return (
    <>
      <AppSidebar image_url={image_url} username={username} />
      <SidebarTrigger />
    </>
  );
}
