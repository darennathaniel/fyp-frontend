import { logout } from "@/reducers/app";
import { axiosPrivate } from "@/utils/axios";
import { useAppDispatch } from "./useAppDispatch";

export function useLogout() {
  const dispatch = useAppDispatch();
  const logoutHelper = async () => {
    await axiosPrivate.post("user/logout");
    dispatch(logout());
  };
  return logoutHelper;
}
