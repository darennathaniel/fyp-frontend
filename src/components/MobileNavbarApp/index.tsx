import { useState } from "react";
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

function StyledAccordion(props: IStyledAccordion & AccordionSingleProps) {
  return (
    <Accordion collapsible className="w-full" {...props}>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline">
          {props.title}
        </AccordionTrigger>
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function MobileNavbarApp() {
  const [open, setOpen] = useState(false);
  return (
    <NavigationMenu className="md:hidden">
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
            <NavigationMenuItem className="w-full">
              <Link to="/" className="w-full block">
                <NavigationMenuLink
                  className={`px-0 text-base w-full ${navigationMenuTriggerStyle()}`}
                >
                  Test
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <StyledAccordion type="single" className="w-full" title="Company">
              <NavigationMenuItem className="w-full">
                <Link to="/1" className="block w-full">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} w-full`}
                  >
                    test
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/2">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} w-full`}
                  >
                    test
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </StyledAccordion>
          </NavigationMenuList>
        </div>
      </div>
    </NavigationMenu>
  );
}
