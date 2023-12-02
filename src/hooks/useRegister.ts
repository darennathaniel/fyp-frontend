import { axiosPrivate } from "@/utils/axios";

export function useRegister() {
  const registerHelper = async (
    username: string,
    email: string,
    password: string,
    wallet_address: string
  ) => {
    await axiosPrivate.post("user/register", {
      username,
      email,
      password,
      wallet_address,
    });
  };
  return registerHelper;
}
