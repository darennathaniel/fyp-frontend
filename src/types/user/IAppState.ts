import { IError } from "./IError";
import { IUser } from "./IUser";

export interface IAppState {
  loading: boolean;
  error: IError;
  user: IUser;
}
