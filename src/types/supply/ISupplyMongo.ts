import { IProduct } from "../product/IProduct";
import { IUser } from "../user/IUser";

export interface ISupplyMongo {
  supplyId: number;
  product: IProduct;
  productId?: number;
  quantity: number;
  quantityLeft: number;
  quantity_left: number;
  timestamp: Date;
  owner: string;
  user: IUser;
}
