import { login } from "@/reducers/app";
import { IUser } from "@/types/user/IUser";
import { axiosPrivate } from "@/utils/axios";
import { useAppDispatch } from "./useAppDispatch";

export function useUser() {
  const dispatch = useAppDispatch();
  const userHelper = async () => {
    const response = await axiosPrivate.get("user/");
    const user = response.data.data[0] as IUser;
    dispatch(login({ ...user, isAuthenticated: true }));
  };
  return userHelper;
}
