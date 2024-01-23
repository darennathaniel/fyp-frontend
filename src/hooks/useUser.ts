import { login } from "@/reducers/app";
import { IUser } from "@/types/user/IUser";
import { axiosPrivate } from "@/utils/axios";
import { useAppDispatch } from "./useAppDispatch";

export function useUser() {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const response = await axiosPrivate.get("user/");
    const user = response.data.data[0];
    dispatch(
      login({ ...user, isAuthenticated: true, isOwner: user.is_owner } as IUser)
    );
  };
  const getLandingUser = async () => {
    const response = await axiosPrivate.get("user/landing");
    return response.data.data[0];
  };
  return { getUser, getLandingUser };
}
