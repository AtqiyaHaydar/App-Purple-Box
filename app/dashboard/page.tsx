// Library Import
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Components Import
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import createSupabaseServerClient from "@/lib/supabase/server";

const CRMDashboard = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="h-screen">
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 md:w-[75vw] 2xl:w-[81vw] h-full rounded-xl p-[1px] bg-gradient "
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center">
            <DashboardHeader />
            {/* <Statistics /> */}
            <div className="p-2 w-full h-full overflow-hidden">
              <Dashboard id={user?.user_metadata.client_id!} />
              {/* <MobileDashboard selectedColumn={selectedColumn} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
