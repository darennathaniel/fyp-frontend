import { IStyledDropdownMenuItem } from "@/types/dropdown/IStyledDropdownMenuItem";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem, DropdownMenuShortcut } from "../dropdown-menu";

export default function StyledDropdownMenuItem(
  props: IStyledDropdownMenuItem & DropdownMenuItemProps
) {
  return (
    <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" {...props}>
      {props.children}
      <DropdownMenuShortcut>{props.shortcut}</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
