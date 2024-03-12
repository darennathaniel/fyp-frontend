import * as React from "react";
import { ICompany, ICompanyPartial } from "../company/ICompany";
import { IProduct } from "../product/IProduct";
import { ISupply } from "../supply/ISupply";

export interface IDialog {
  children: React.ReactNode;
}

export interface ISendContractDialog extends IDialog {
  to: ICompanyPartial;
  products: (IProduct & ISupply)[];
}

export interface ISendContractHomeDialog extends IDialog {
  companies: ICompany[];
}

export interface ISendSupplyRequestDialog extends IDialog {
  product: IProduct;
  owner: string;
  company_name: string;
}

export interface IConvertToSupplyDialog extends IProductDialog {
  product: IProduct & ISupply;
  prerequisiteData?: (IProduct & ISupply & { owner: string })[];
  setPrerequisiteData?: React.Dispatch<
    React.SetStateAction<(IProduct & ISupply & { owner: string })[]>
  >;
}

export interface IProductDialog extends IDialog {
  data?: (IProduct & ISupply)[];
  setData?: React.Dispatch<React.SetStateAction<(IProduct & ISupply)[]>>;
  allData?: IProduct[];
  setAllData?: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
