import { IProduct } from "../product/IProduct";

export interface ISupplyMongo {
  supplyId: number;
  product: IProduct;
  quantity: number;
  quantityLeft: number;
  quantity_left: number;
  timestamp: Date;
}
