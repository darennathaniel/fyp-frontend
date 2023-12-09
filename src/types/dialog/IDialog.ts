import * as React from "react";
import { IProduct } from "../product/IProduct";
import { ISupply } from "../supply/ISupply";

export interface IDialog {
  children: React.ReactNode;
}

export interface ISendContractDialog extends IDialog {
  to: { wallet_address: string; company_name: string };
  products: (IProduct & ISupply)[];
}