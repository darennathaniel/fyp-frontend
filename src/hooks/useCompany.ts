import { axiosPrivate } from "@/utils/axios";

export function useCompany() {
  const getAllCompanyHelper = async () => {
    const response = await axiosPrivate.get("company/");
    const companies = response.data.data[0];
    console.log(companies);
    return companies;
  };
  return getAllCompanyHelper;
}
