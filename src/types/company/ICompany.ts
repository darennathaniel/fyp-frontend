import { IDeleteRequest } from "../request/IDeleteRequest";
import { IRequest } from "../request/IRequest";
import { ICompanyContract } from "./ICompanyContract";
import { ICompanyProduct } from "./ICompanyProduct";

export interface ICompany {
  owner: string;
  name: string;
  listOfSupply: Array<Number>;
  listOfPrerequisites: Array<Number>;
  upstream: Array<ICompanyProduct>;
  downstream: Array<ICompanyProduct>;
  incomingRequests: Array<IRequest>;
  outgoingRequests: Array<IRequest>;
  incomingContract: Array<ICompanyContract>;
  outgoingContract: Array<ICompanyContract>;
  incomingDeleteRequests: Array<IDeleteRequest>;
  outgoingDeleteRequests: Array<IDeleteRequest>;
}

export interface ICompanyPartial {
  wallet_address: string;
  company_name: string;
}
