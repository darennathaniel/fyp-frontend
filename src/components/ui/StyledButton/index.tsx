import { IStyledButton } from "@/types/button/IStyledButton";
import { Button, ButtonProps } from "../button";

export default function StyledButton(props: IStyledButton & ButtonProps) {
  return (
    <Button
      variant="outline"
      className="hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950"
      {...props}
    >
      {props.text}
    </Button>
  );
}
