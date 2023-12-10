import { axiosPrivate } from "@/utils/axios";

export function useSupply() {
  const getAllSupply = async () => {
    const response = await axiosPrivate.get("supply/");
    return response.data.data[0];
  };
  return { getAllSupply };
}
