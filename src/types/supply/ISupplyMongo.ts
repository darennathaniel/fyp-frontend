import { IProduct } from "../product/IProduct";
import { IUser } from "../user/IUser";
import { ISupply } from "./ISupply";

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
  updated_prerequisite_quantities: (ISupply & { productId: number })[];
}
