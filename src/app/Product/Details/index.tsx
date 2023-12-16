import { DataTable } from "@/components/DataTable";
import DetailsHeader from "@/components/DetailsHeader";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { ICompany } from "@/types/company/ICompany";
import { IProduct } from "@/types/product/IProduct";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { columns } from "./columns";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { getProduct } = useProduct();
  useEffect(() => {
    showLoading();
    getProduct(id ?? 0)
      .then((response) => {
        setProduct(response.product);
        setCompanies(response.companies);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, [id]);
  return (
    <div className="flex justify-center flex-col space-y-6 px-4 py-2">
      <div>
        <div className="text-2xl font-semibold">
          Product ID: {product?.productId}
        </div>
        <div className="font-medium max-md:w-40 overflow-x-hidden text-ellipsis text-sm text-zinc-400">
          Product Name: {product?.productName}
        </div>
      </div>
      <DetailsHeader title="Product Owners" />
      <div className="w-full h-1/2 lg:min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <div className="w-3/4">
          <DataTable columns={columns} data={companies} />
        </div>
      </div>
    </div>
  );
}
