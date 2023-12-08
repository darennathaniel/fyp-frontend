import { axiosPrivate } from "@/utils/axios";

export function useProduct() {
  const getProductByCompany = async (companyAddress: string) => {
    const response = await axiosPrivate.get("product", {
      params: {
        company_address: companyAddress,
      },
    });
    const data = response.data.data[0];
    return data;
  };
  const getPrerequisiteByCompany = async (companyAddress: string) => {
    const response = await axiosPrivate.get("product/prerequisite", {
      params: {
        company_address: companyAddress,
      },
    });
    const data = response.data.data[0];
    return data;
  };
  return { getProductByCompany, getPrerequisiteByCompany };
}
