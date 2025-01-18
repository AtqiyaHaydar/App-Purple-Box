import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin text-white w-24 h-24" />
    </div>
  );
}
