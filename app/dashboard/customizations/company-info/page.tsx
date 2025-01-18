import React, { Suspense } from "react";
import CompanyInfoPage from "./client-page";
import { cn } from "@/lib/utils";
import { getClient } from "@/app/actions/client";
import LoadingPage from "@/components/LoadingPage";

async function ClientData() {
  const initialData = await getClient();
  return <CompanyInfoPage initialData={initialData!} />;
}

export default async function page() {
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 md:w-[75vw] 2xl:w-[80vw] h-full rounded-xl p-[1px] bg-gradient "
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center ">
            <div className="p-2 w-full h-full overflow-hidden overflow-y-scroll flex flex-col gap-12">
              <Suspense fallback={<LoadingPage />}>
                <ClientData />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
