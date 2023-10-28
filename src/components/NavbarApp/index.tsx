import { Outlet, useLocation } from "react-router";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IStyledDropdownMenuItem } from "@/types/dropdown/IStyledDropdownMenuItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useLogout } from "@/hooks/useLogout";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { useUser } from "@/hooks/useUser";
import MobileNavbarApp from "../MobileNavbarApp";

function StyledDropdownMenuItem(
  props: IStyledDropdownMenuItem & DropdownMenuItemProps
) {
  return (
    <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" {...props}>
      {props.title}
      <DropdownMenuShortcut>{props.shortcut}</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default function NavbarApp() {
  const location = useLocation();
  const logout = useLogout();
  const getUser = useUser();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    getUser();
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
              <Link to="/1">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/1" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/2">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-gray-300 ${
                    currentLocation === "/2" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Documentation
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
                      {user.display_name
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
                      {user.display_name}
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
                  <StyledDropdownMenuItem title="Profile" shortcut="⇧⌘P" />
                  <StyledDropdownMenuItem title="Settings" shortcut="⌘S" />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <StyledDropdownMenuItem
                  title="Log out"
                  shortcut="⇧⌘Q"
                  onClick={() => logout()}
                />
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
