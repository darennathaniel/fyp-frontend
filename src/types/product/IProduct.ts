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

export interface IAddProductForm {
  productName: { value: string };
}
