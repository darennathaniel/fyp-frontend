import { Outlet, useLocation, useNavigate } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import MobileNavbarApp from "../MobileNavbarApp";
import StyledDropdownMenuItem from "../ui/StyledDropdownMenuItem";
import { profileRoutes } from "@/constants/profiles.routes.constant";

export default function NavbarApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const { getUser } = useUser();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    getUser().catch(() => logout());
  }, []);
  return (
    <div>
      <div className="border-b flex justify-between h-16">
        <MobileNavbarApp />
        <NavigationMenu className="items-center hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/company">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/company"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Company
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/product">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/product"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Product
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/supply">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/supply"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Supply
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center px-2">
          {user.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>
                      {user.company_name
                        .split(" ")
                        .map((word) => word.toUpperCase()[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-zinc-950 text-white"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.company_name}
                    </p>
                    <p className="text-xs leading-none text-gray-300">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-gray-300 text-ellipsis overflow-hidden">
                      {user.wallet_address}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {profileRoutes.map((route) => (
                    <Link
                      key={route.href}
                      to={`${route.prefix}${
                        route.href.length === 0 ? "" : `/${route.href}`
                      }`}
                    >
                      <StyledDropdownMenuItem>
                        {route.title}
                      </StyledDropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <StyledDropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Log out
                </StyledDropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sso/login">
              <Button
                variant="outline"
                className="hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950"
              >
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
