import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import createSupabaseServerClient from "@/lib/supabase/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-screen">
      <div className="p-4 h-screen font-gotham">
        <div
          className={cn(
            "relative transition-all duration-500 w-full md:w-[75vw] 2xl:w-[80vw] h-full rounded-xl p-[1px] bg-gradient "
          )}
        >
          <div className="bg-[#0A0A0A] relative w-full h-full inset-0 rounded-xl flex flex-col items-center ">
            <div className="p-2 w-full h-full overflow-hidden overflow-y-scroll flex flex-col gap-12">
              <ProfileForm user={user} />
              <PasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
