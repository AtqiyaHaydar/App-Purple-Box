import React, { Suspense } from "react";
import { Metadata } from "next";
import LoadingPage from "@/components/LoadingPage";

export const metadata: Metadata = {
  title: "Purple Box CRM Dashboard | Manage Your E-commerce Relationships",
  description:
    "Access the Purple Box CRM dashboard to manage customer interactions, track client acquisition, and enhance support. Designed for e-commerce businesses, Purple Box provides seamless multi-channel integration and AI-powered insights.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purple-box-crm.vercel.app/dashboard",
    title: "Purple Box CRM Dashboard | Manage Your E-commerce Relationships",
    description:
      "Log in to the Purple Box CRM to manage and grow your e-commerce business. Leverage customer insights, streamline client management, and integrate effortlessly across platforms.",
    siteName: "Purple Box CRM",
  },
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
