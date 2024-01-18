import { IProduct } from "../product/IProduct";
import { IUser } from "../user/IUser";

export interface IRequest {
  id: Number;
  from: IUser;
  to: IUser;
  product?: IProduct;
  quantity: Number;
}

export interface IProductRequest {
  _id: string;
  productId: number;
  productName: string;
  company: string;
  existing: boolean;
  created_at: Date;
  updated_at: Date;
  progress: string;
}

export enum REQUEST_STATE {
  APPROVED,
  REJECTED,
}

export interface IRequestTable extends IRequest {
  productString: string;
}

export interface IRequestHistory extends IRequest {
  state: string | REQUEST_STATE;
  timestamp: number;
  requestId: number;
}

export interface IRequestTableMeta {
  data: IRequestTable[];
  setData: React.Dispatch<React.SetStateAction<IRequestTable[]>>;
}

export interface IProductRequestTableMeta {
  data: IProductRequest[];
  setData: React.Dispatch<React.SetStateAction<IProductRequest[]>>;
}
