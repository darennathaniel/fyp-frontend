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
  sidebarNavItems: ISidebarNavItems[];
}

export default function SidebarApp({ sidebarNavItems }: ISidebarApp) {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6 bg-white" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
