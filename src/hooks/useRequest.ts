import {
  IRequest,
  IRequestHistory,
  IRequestTable,
} from "@/types/request/IRequest";
import { axiosPrivate } from "@/utils/axios";

export function useRequest() {
  const getIncomingRequest = async () => {
    const response = await axiosPrivate.get("request/incoming", {
      params: {
        timeline: "current",
      },
    });
    const requests = response.data.data[0];
    return requests.map((request: IRequest) => {
      return {
        ...request,
        productString: `${request.product?.productId} - ${request.product?.productName}`,
      } as IRequestTable;
    }) as IRequestTable[];
  };
  const getOutgoingRequest = async () => {
    const response = await axiosPrivate.get("request/outgoing", {
      params: {
        timeline: "current",
      },
    });
    const requests = response.data.data[0];
    return requests.map((request: IRequest) => {
      return {
        ...request,
        productString: `${request.product?.productId} - ${request.product?.productName}`,
      } as IRequestTable;
    }) as IRequestTable[];
  };
  const getHistoryRequest = async () => {
    const response1 = await axiosPrivate.get("request/incoming", {
      params: {
        timeline: "past",
      },
    });
    const response2 = await axiosPrivate.get("request/outgoing", {
      params: {
        timeline: "past",
      },
    });
    const requests = (response1.data.data[0] as IRequestHistory[]).concat(
      response2.data.data[0] as IRequestHistory[]
    );
    return requests.map((request) => {
      return {
        ...request,
        productString: `${request.product?.productName} - ${request.product?.productId}`,
        id: request.requestId,
      };
    });
  };
  const approveRequest = async (
    id: number,
    from: string,
    to: string,
    productId: number,
    quantity: number
  ) => {
    const response = await axiosPrivate.post("request/approve", {
      id,
      from,
      to,
      product_id: productId,
      quantity,
    });
    return response;
  };
  const declineRequest = async (
    id: number,
    from: string,
    to: string,
    productId: number,
    quantity: number
  ) => {
    const response = await axiosPrivate.post("request/decline", {
      id,
      from,
      to,
      product_id: productId,
      quantity,
    });
    return response;
  };
  const sendRequest = async (
    to: string,
    productId: string | number,
    quantity: number
  ) => {
    const response = await axiosPrivate.post("request", {
      to,
      product_id: productId,
      quantity,
    });
    return response;
  };
  return {
    getIncomingRequest,
    getOutgoingRequest,
    getHistoryRequest,
    approveRequest,
    declineRequest,
    sendRequest,
  };
}
