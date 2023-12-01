import { ICompany } from "@/types/company/ICompany";
import { axiosPrivate } from "@/utils/axios";

export function useCompany() {
  const getAllCompany = async () => {
    const response = await axiosPrivate.get("company/");
    const companies = response.data.data[0];
    console.log(companies);
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
  return { getAllCompany, addCompany };
}
