import { IStatus } from "./IStatus";
import { IUser } from "./IUser";

export interface IAppState {
  loading: boolean;
  app_state: IStatus;
  user: IUser;
}
