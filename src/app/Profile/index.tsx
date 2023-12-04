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
          <Route
            path={route.href.split("/")[route.href.split("/").length - 1]}
            element={route.component}
          />
        ))}
      </Route>
    </Routes>
  );
}
