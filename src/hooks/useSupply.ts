import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { axiosPrivate } from "@/utils/axios";
import { MarkerType } from "reactflow";

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
  const convertPrerequisiteToSupply = async (
    productId: number,
    quantity: number
  ) => {
    const response = await axiosPrivate.post("supply/prerequisite", {
      product_id: productId,
      number_of_supply: quantity,
    });
    return response.data.data[0];
  };
  const getSupply = async (supplyId: string) => {
    const response = await axiosPrivate.get("supply/", {
      params: {
        supply_id: supplyId,
      },
    });
    const supplies = response.data.data;
    const edges = response.data.data[0].edges.map((edge: any) => {
      return {
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
    });
    supplies[0]["edges"] = edges;
    return supplies[0];
  };
  return {
    getAllSupply,
    convertToSupply,
    getSupply,
    convertPrerequisiteToSupply,
  };
}
