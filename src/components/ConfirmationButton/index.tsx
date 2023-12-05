import { IConfirmationButton } from "@/types/button/IConfirmationButton";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import StyledButton from "../ui/StyledButton";

export default function ConfirmationButton(props: IConfirmationButton) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={props.triggerClassName}>
        {props.children}
      </PopoverTrigger>
      <PopoverContent
        className={`bg-zinc-950 text-white w-fit ${props.contentClassName}`}
      >
        <div className="space-y-2">
          <div>Are you sure?</div>
          <div className="space-x-4">
            <StyledButton
              className="h-8 text-xs"
              onClick={(e) => {
                props.onConfirmClick(e);
                setOpen(false);
              }}
            >
              Yes
            </StyledButton>
            <StyledButton
              className="h-8 text-xs"
              onClick={(e) => {
                props.onCancelClick(e);
                setOpen(false);
              }}
            >
              No
            </StyledButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
