import { ICompanyProduct } from "../company/ICompanyProduct";

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
