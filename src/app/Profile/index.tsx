import SidebarApp from "@/components/SidebarApp";
import { profileRoutes } from "@/constants/profiles.routes.constant";
import { Routes, Route } from "react-router-dom";

export default function Profile() {
  return (
    <Routes>
      <Route
        element={
          <SidebarApp
            title="Account"
            subtitle="Manage your account, contract, and requests."
            sidebarNavItems={profileRoutes}
          />
        }
      >
        {profileRoutes.map((route) => (
          <Route path={route.href} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
}
