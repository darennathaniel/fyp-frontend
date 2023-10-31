import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { IStyledAccordion } from "@/types/accordion/IStyledAccordion";
import { AccordionSingleProps } from "@radix-ui/react-accordion";
import { IStyledMobileNavigationItem } from "@/types/navigation/IStyledMobileNavigationItem";
import { NavigationMenuItemProps } from "@radix-ui/react-navigation-menu";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

function StyledMobileNavigationItem(
  props: IStyledMobileNavigationItem & NavigationMenuItemProps
) {
  return (
    <NavigationMenuItem className="w-full border-b" {...props}>
      <Link to={props.to} className="w-full block">
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()}`}
          style={{ fontSize: "1rem", padding: 0 }}
        >
          {props.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

function StyledAccordion(props: IStyledAccordion & AccordionSingleProps) {
  return (
    <Accordion collapsible className="w-full" {...props}>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline text-base">
          {props.title}
        </AccordionTrigger>
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function MobileNavbarApp() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useOnClickOutside(() => setOpen(false), ref);
  return (
    <NavigationMenu className="md:hidden" ref={ref}>
      <div className="items-center px-4 mx-auto">
        <div className="flex items-center justify-between py-3">
          <div className="md:hidden">
            <Button
              variant="outline"
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </div>
        </div>
        <div
          className={`absolute bg-zinc-950 w-screen left-0 p-3 ${
            open ? "block" : "hidden"
          }`}
        >
          <NavigationMenuList className="flex flex-col">
            <StyledMobileNavigationItem
              to="/"
              title="Home"
              onClick={() => setOpen(false)}
            />
            <StyledAccordion
              type="single"
              className="w-full border-b"
              title="Company"
            >
              <StyledMobileNavigationItem
                to="/1"
                title="test"
                className="border-b-0"
                onClick={() => setOpen(false)}
              />
              <StyledMobileNavigationItem
                to="/2"
                title="test"
                className="border-b-0"
                onClick={() => setOpen(false)}
              />
            </StyledAccordion>
          </NavigationMenuList>
        </div>
      </div>
    </NavigationMenu>
  );
}
