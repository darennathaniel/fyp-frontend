import { IProduct } from "../product/IProduct";

export interface ISupplyMongo {
  supplyId: number;
  product: IProduct;
  productId?: number;
  quantity: number;
  quantityLeft: number;
  quantity_left: number;
  timestamp: Date;
}
