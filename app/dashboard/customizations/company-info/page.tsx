import React from "react";
import CompanyInfoPage from "./client-page";
import { cn } from "@/lib/utils";
import { getClient } from "@/app/actions/client";

export default async function page() {
  const initialData = await getClient();

  return (
    <div className="h-screen">
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 w-auto h-full rounded-xl p-[1px] bg-gradient "
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center ">
            <div className="p-2 w-full h-full overflow-hidden overflow-y-scroll flex flex-col gap-12">
              <CompanyInfoPage initialData={initialData!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
