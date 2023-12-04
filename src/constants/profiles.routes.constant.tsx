import ProfileHome from "@/app/Profile/Home";
import ProfileContract from "@/app/Profile/Contract";
import { ISidebarNavItems } from "@/components/SidebarApp";
import ProfileRequest from "@/app/Profile/Request";

export const profileRoutes: ISidebarNavItems[] = [
  {
    title: "Profile",
    href: "",
    component: <ProfileHome />,
    prefix: "/profile",
  },
  {
    title: "Contract",
    href: "contract",
    component: <ProfileContract />,
    prefix: "/profile",
  },
  {
    title: "Request",
    href: "request",
    component: <ProfileRequest />,
    prefix: "/profile",
  },
];
