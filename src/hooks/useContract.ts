import {
  CONTRACT_STATE,
  IContract,
  IContractHistory,
  IContractTable,
} from "@/types/contract/IContract";
import { axiosPrivate } from "@/utils/axios";

export function useContract() {
  const getIncomingContract = async () => {
    const response = await axiosPrivate.get("contract/incoming", {
      params: {
        timeline: "current",
      },
    });
    const contracts = response.data.data[0];
    return contracts.map((contract: IContract) => {
      return {
        ...contract,
        productString: `${contract.product?.productId} - ${contract.product?.productName}`,
      } as IContractTable;
    }) as IContractTable[];
  };
  const getOutgoingContract = async () => {
    const response = await axiosPrivate.get("contract/outgoing", {
      params: {
        timeline: "current",
      },
    });
    const contracts = response.data.data[0];
    return contracts.map((contract: IContract) => {
      return {
        ...contract,
        productString: `${contract.product?.productId} - ${contract.product?.productName}`,
      } as IContractTable;
    }) as IContractTable[];
  };
  const getHistoryContract = async () => {
    const response1 = await axiosPrivate.get("contract/incoming", {
      params: {
        timeline: "past",
      },
    });
    const response2 = await axiosPrivate.get("contract/outgoing", {
      params: {
        timeline: "past",
      },
    });
    const contracts = (response1.data.data[0] as IContractHistory[]).concat(
      response2.data.data[0] as IContractHistory[]
    );
    return contracts.map((contract) => {
      return {
        ...contract,
        productString: `${contract.product?.productName} - ${contract.product?.productId}`,
        id: contract.contractId,
      };
    });
  };
  const approveContract = async (
    id: number,
    from: string,
    to: string,
    productId: number
  ) => {
    const response = await axiosPrivate.post("contract/approve", {
      id,
      from,
      to,
      product_id: productId,
    });
    return response;
  };
  const declineContract = async (
    id: number,
    from: string,
    to: string,
    productId: number
  ) => {
    const response = await axiosPrivate.post("contract/decline", {
      id,
      from,
      to,
      product_id: productId,
    });
    return response;
  };
  const sendContract = async (to: string, productId: number) => {
    const response = await axiosPrivate.post("contract/", {
      to,
      product_id: productId,
    });
    return response;
  };
  return {
    getIncomingContract,
    getOutgoingContract,
    getHistoryContract,
    approveContract,
    declineContract,
    sendContract,
  };
}
