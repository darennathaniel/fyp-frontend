import { ICompany } from "@/types/company/ICompany";
import axios, { axiosPrivate } from "@/utils/axios";
import { MarkerType } from "reactflow";

export function useCompany() {
  const getAllCompany = async () => {
    const response = await axiosPrivate.get("company/");
    const companies = response.data.data;
    const edges = response.data.data[1].edges.map((edge: any) => {
      return {
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
    });
    companies[1]["edges"] = edges;
    return companies;
  };
  const getCompany = async (company_address: string) => {
    const response = await axiosPrivate.get("company/", {
      params: {
        company_address,
      },
    });
    const companies = response.data.data;
    const edges = response.data.data[1].edges.map((edge: any) => {
      return {
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
    });
    companies[1]["edges"] = edges;
    return companies;
  };
  const addCompany = async (
    company_name: string,
    username: string,
    email: string,
    wallet_address: string
  ) => {
    try {
      const response = await axiosPrivate.post("company/", {
        owner: wallet_address,
        company_name,
        username,
        email,
      });
      return response.data as ICompany;
    } catch (err) {
      throw err;
    }
  };
  return { getAllCompany, getCompany, addCompany };
}
