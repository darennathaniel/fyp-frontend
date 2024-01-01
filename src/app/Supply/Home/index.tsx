import { DataTable } from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useSupply } from "@/hooks/useSupply";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { columns } from "./columns";

export default function SupplyHome() {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<ISupplyMongo[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const page = searchParams.get("page") ?? "1";
  const limitPage = searchParams.get("limit") ?? "10";
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { getAllSupply } = useSupply();
  useEffect(() => {
    showLoading();
    getAllSupply(page, limitPage)
      .then((res) => {
        setPageCount(res.total_pages);
        setData(res.supplies);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, [search]);
  return (
    <div>
      <div className="w-full flex justify-center items-center flex-col h-[calc(100vh-8rem)]">
        <div className="w-3/4">
          <PageHeader
            title="List of Past Supplies"
            description="Below is a table that lists down all supplies that has been done over the past."
          />
        </div>
        <div className="w-3/4">
          <DataTable
            data={data}
            columns={columns}
            totalPages={pageCount}
            pathname="/supply"
          />
        </div>
      </div>
    </div>
  );
}
