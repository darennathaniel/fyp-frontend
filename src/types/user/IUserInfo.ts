import { IUser } from "./IUser";

export interface IUserInfo extends IUser {
  upstream: number;
  downstream: number;
  supply: number;
  prerequisite: number;
}
