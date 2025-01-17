import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getLocale, getMessages } from "next-intl/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import Providers from "./Providers";
import createSupabaseServerClient from "@/lib/supabase/server";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Purple Box | AI-Powered CRM for E-commerce",
  description:
    "Purple Box is an AI-powered CRM designed to centralize and streamline e-commerce operations. Our platform addresses the critical needs of modern online businesses, from customer support to client acquisition, offering seamless integration across multiple channels.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purple-box-crm.vercel.app",
    title: "Purple Box | AI-Powered CRM for E-commerce",
    description:
      "Discover Purple Box, an AI-driven CRM crafted for e-commerce, focusing on customer engagement, client acquisition, and multi-channel integration for efficient business management.",
    siteName: "Purple Box CRM",
  },
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const locale = await getLocale();
  const messages = await getMessages();

  const { data } = await supabase
    .from("client")
    .select("image_url")
    .eq("id", user?.user_metadata.client_id)
    .single();

  console.log(data);

  return (
    <html lang={locale}>
      <body className="relative bg-primary-dark font-gotham antialiased">
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <Providers
              image_url={data?.image_url}
              username={user?.user_metadata.full_name}
            />
            {children}
          </SidebarProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
