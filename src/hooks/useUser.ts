import { login } from "@/reducers/app";
import { IUser } from "@/types/user/IUser";
import { IUserInfo } from "@/types/user/IUserInfo";
import { axiosPrivate } from "@/utils/axios";
import { useAppDispatch } from "./useAppDispatch";

export function useUser() {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const response = await axiosPrivate.get("user/");
    const user = response.data.data[0] as IUser;
    dispatch(login({ ...user, isAuthenticated: true }));
  };
  const getUserInfo = async () => {
    const response = await axiosPrivate.get("user/info");
    return { ...response.data.data[0], isAuthenticated: true } as IUserInfo;
  };
  return { getUser, getUserInfo };
}
