import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import { getLinks } from "@/app/actions/link";
import LoadingPage from "@/components/LoadingPage";
import dynamic from "next/dynamic";

const LinksAndPromptsPage = dynamic(() => import("./client-page"), {
  ssr: false,
});

async function LinksData() {
  const initialData = await getLinks();
  return <LinksAndPromptsPage initialData={initialData!} />;
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
                <LinksData />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
