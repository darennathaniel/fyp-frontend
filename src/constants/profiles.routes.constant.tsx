import ProfileHome from "@/app/Profile/Home";
import ProfileSettings from "@/app/Profile/Settings";
import { ISidebarNavItems } from "@/components/SidebarApp";

export const profileRoutes: ISidebarNavItems[] = [
  {
    title: "Profile",
    href: "",
    component: <ProfileHome />,
    prefix: "/profile",
  },
  {
    title: "Settings",
    href: "settings",
    component: <ProfileSettings />,
    prefix: "/profile",
  },
];
