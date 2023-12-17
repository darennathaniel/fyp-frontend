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

export interface IRecipeDisplay {
  product: IProduct;
  inventory_quantity: number;
  recipe_quantity: number;
  product_owner: ICompanyProduct;
}

export interface IAddProductForm {
  productName: { value: string };
}
