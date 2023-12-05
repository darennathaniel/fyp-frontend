import { IProduct } from "../product/IProduct";
import { IUser } from "../user/IUser";

export interface IContract {
  id: number;
  from: IUser;
  to: IUser;
  product?: IProduct;
}

export enum CONTRACT_STATE {
  APPROVED,
  REJECTED,
}

export interface IContractTable extends IContract {
  productString: string;
}

export interface IContractHistory extends IContract {
  state: string | CONTRACT_STATE;
  timestamp: number;
  contractId: number;
}

export interface IContractTableMeta {
  data: IContractTable[];
  setData: React.Dispatch<React.SetStateAction<IContractTable[]>>;
}
