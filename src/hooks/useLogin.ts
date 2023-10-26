import { axiosPrivate } from "@/utils/axios";

export function useLogin() {
  const loginHelper = async (username: string, password: string) => {
    await axiosPrivate.post("user/login", {
      username,
      password,
    });
  };
  return loginHelper;
}
