import * as React from "react";
import { HTMLProps } from "react";

export interface IConfirmationButton {
  triggerClassName?: HTMLProps<HTMLElement>["className"];
  contentClassName?: HTMLProps<HTMLElement>["className"];
  onConfirmClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode | React.ReactNode[];
}
