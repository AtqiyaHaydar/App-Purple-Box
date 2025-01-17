import React from "react";
import { cn } from "@/lib/utils";
import createSupabaseServerClient from "@/lib/supabase/server";
import AdditionalInfoPage from "./client-page";

export default async function page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: initialData } = await supabase
    .from("client")
    .select("*")
    .eq("id", user?.user_metadata.client_id)
    .single();

  return (
    <div className="h-screen">
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 md:w-[75vw] 2xl:w-[80vw] h-full rounded-xl p-[1px] bg-gradient "
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center ">
            <div className="p-2 w-full h-full overflow-hidden overflow-y-scroll flex flex-col gap-12">
              <AdditionalInfoPage initialData={initialData!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}