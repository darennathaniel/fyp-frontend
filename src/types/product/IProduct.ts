import { ICompanyProduct } from "../company/ICompanyProduct";
import { IUser } from "../user/IUser";

export interface IProduct {
  productId: number;
  productName: string;
  has_recipe: boolean;
}

export interface IRecipe {
  productId?: number;
  productName?: string;
  quantity?: number;
}

export interface IRecipeBase {
  product: IProduct;
  inventory_quantity: number;
  recipe_quantity: number;
}
export interface IRecipeDisplay extends IRecipeBase {
  product_owner: ICompanyProduct[];
}

export interface IRecipeSupplyDisplay extends IRecipeBase {
  product_owner: ICompanyProduct;
}

export interface IAddProductForm {
  productName: { value: string };
}

export interface ISendSupplyRequestForm {
  quantity: { value: number };
}

export interface IDeleteRequest {
  id: number;
  product: IProduct;
  owner: IUser;
}

export interface IIncomingDeleteRequestTable extends IDeleteRequest {
  enough_approval: boolean;
  code: string;
}

export interface IOutgoingDeleteRequestTable extends IDeleteRequest {
  code: string;
  upstream: number;
  approvals: number;
  enough_approval: boolean;
}

export interface IHistoryDeleteRequestTable extends IDeleteRequest {
  responder: IUser;
}

export interface IDeleteRequestTableMeta {
  data: IIncomingDeleteRequestTable[];
  setData: React.Dispatch<React.SetStateAction<IIncomingDeleteRequestTable[]>>;
}
