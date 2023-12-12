import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { axiosPrivate } from "@/utils/axios";

export function useSupply() {
  const getAllSupply = async (page?: string, limit?: string) => {
    const response = await axiosPrivate.get("supply/", {
      params: {
        page,
        limit,
      },
    });
    const transformed_response = response.data.data[0].supplies.map(
      (supply: ISupplyMongo) => {
        return {
          ...supply,
          quantityLeft: supply.quantity_left,
        };
      }
    );
    return { ...response.data.data[0], supplies: transformed_response };
  };
  const convertToSupply = async (
    product_id: number,
    number_of_supply: number
  ) => {
    const response = await axiosPrivate.post("supply/", {
      product_id,
      number_of_supply,
    });
    return response;
  };
  return { getAllSupply, convertToSupply };
}
