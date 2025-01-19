import {
  ChevronDown,
  FacebookIcon,
  Home,
  Inbox,
  LinkIcon,
  UserIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import PurpleLogo from "@/assets/Purple-Box Rebrand.png";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ProfileContextButton } from "../ProfileContextButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import Link from "next/link";
import { useTranslations } from "use-intl";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

// Menu items.
const dashboardItems = [
  {
    title: "sidebar.dashboard.communication",
    url: "/dashboard",
    icon: UserIcon,
  },
];

const customizationItems = [
  {
    title: "sidebar.customizations.companyInfo",
    url: "/dashboard/customizations/company-info",
    icon: Home,
  },
  {
    title: "sidebar.customizations.additionalInfo",
    url: "/dashboard/customizations/additional-info",
    icon: Inbox,
  },
  {
    title: "sidebar.customizations.linksAndPrompts",
    url: "/dashboard/customizations/links-and-prompts",
    icon: LinkIcon,
  },
  // {
  //   title: "sidebar.customizations.facebookLogin",
  //   url: "/dashboard/customizations/facebook-login",
  //   icon: FacebookIcon,
  // },
];

export function AppSidebar({
  username,
  image_url,
}: {
  username: string;
  image_url: string;
}) {
  const t = useTranslations();
  // const pathname = usePathname();

  // const isCurrent = useCallback(
  //   (url: string) => {
  //     return pathname === url;
  //   },
  //   [pathname]
  // );
  return (
    <Sidebar>
      <SidebarHeader className="pt-6">
        <div className="flex items-center w-full justify-between ">
          <div className="pl-2 justify-between flex items-center gap-x-4">
            <Image src={PurpleLogo} alt="Purple Box Logo" className="w-8 h-8" />
            <p className="font-gotham text-white text-[18px]">Purple Box</p>
          </div>
          {/* <div className="hover:bg-white/10 transition-all p-2 rounded-full flex justify-between items-center">
          <ChevronsRight className='text-white transition-all duration-500 cursor-pointer' />
        </div> */}
        </div>
      </SidebarHeader>
      <SidebarContent className=" text-white rounded-none">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-bold">
            {t("sidebar.label.dashboard")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  // className={
                  //   isCurrent(item.url) ? "bg-primary-purple rounded-lg" : ""
                  // }
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-white font-bold">
              <CollapsibleTrigger>
                {t("sidebar.label.customizations")}
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {customizationItems.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      // className={
                      //   isCurrent(item.url)
                      //     ? "bg-primary-purple rounded-lg"
                      //     : ""
                      // }
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{t(item.title)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-between items-center bg-white/10 border border-primary-purple p-3 rounded-full">
          <div className="flex items-center gap-2 text-white">
            <Avatar>
              <AvatarImage
                src={`${
                  image_url && image_url.length > 0
                    ? image_url
                    : "https://github.com/shadcn.png"
                }`}
                alt="@shadcn"
              />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>{" "}
            <p className="line-clamp-1 text-sm">{username}</p>
          </div>
          <ProfileContextButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
