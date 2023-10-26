import { axiosPrivate } from "@/utils/axios";

export function useRegister() {
  const registerHelper = async (
    username: string,
    password: string,
    wallet_address: string
  ) => {
    await axiosPrivate.post("user/register", {
      username,
      password,
      wallet_address,
    });
  };
  return registerHelper;
}
