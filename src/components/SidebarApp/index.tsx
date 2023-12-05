import { Outlet } from "react-router";
import { Separator } from "../ui/separator";
import SidebarNav from "./SidebarNav";

export interface ISidebarNavItems {
  title: string;
  href: string;
  component?: React.ReactNode;
  prefix: string;
}

interface ISidebarApp {
  title: string;
  subtitle: string;
  sidebarNavItems: ISidebarNavItems[];
}

export default function SidebarApp({
  sidebarNavItems,
  title,
  subtitle,
}: ISidebarApp) {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <Separator className="my-6 bg-white" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
