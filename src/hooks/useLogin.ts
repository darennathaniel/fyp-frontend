import { login } from "@/reducers/app";
import { IUser } from "@/types/user/IUser";
import { axiosPrivate } from "@/utils/axios";
import { useAppDispatch } from "./useAppDispatch";

export function useLogin() {
  const dispatch = useAppDispatch();
  const loginHelper = async (username_or_email: string, password: string) => {
    const response = await axiosPrivate.post("user/login", {
      username_or_email,
      password,
    });
    const user = response.data.data[0];
    dispatch(
      login({ ...user, isAuthenticated: true, isOwner: user.is_owner } as IUser)
    );
    return response;
  };
  return loginHelper;
}
