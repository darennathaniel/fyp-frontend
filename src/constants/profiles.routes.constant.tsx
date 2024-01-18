import ProfileHome from "@/app/Profile/Home";
import ProfileContract from "@/app/Profile/Contract";
import { ISidebarNavItems } from "@/components/SidebarApp";
import ProfileRequestSupply from "@/app/Profile/Request/Supply";
import ProfileRequestDelete from "@/app/Profile/Request/Delete";
import ProfileRequestProduct from "@/app/Profile/Request/Product";

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
    title: "Product Request",
    href: "request/product",
    component: <ProfileRequestProduct />,
    prefix: "/profile",
  },
  {
    title: "Supply Request",
    href: "request/supply",
    component: <ProfileRequestSupply />,
    prefix: "/profile",
  },
  {
    title: "Delete Request",
    href: "request/delete",
    component: <ProfileRequestDelete />,
    prefix: "/profile",
  },
];
