import { DataTable } from "@/components/DataTable";
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
  const user = useAppSelector((state) => state.app.user);
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
        console.log(res.total_pages);
        setPageCount(res.total_pages);
        setData(res.supplies);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, [search]);
  //   if (!user.isAuthenticated) {
  //     return <DataTable />;
  //   }
  return (
    <Tabs
      className="w-full items-center flex flex-col space-y-6 p-3"
      defaultValue="my_supply"
    >
      <TabsList className="w-1/4 bg-zinc-700">
        <TabsTrigger
          value="my_supply"
          className="rounded-lg text-gray-400 hover:text-white w-1/2 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
        >
          My Supply
        </TabsTrigger>
        <TabsTrigger
          value="all_supply"
          className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
        >
          All Supply
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my_supply" className="w-full flex justify-center">
        <div className="w-full">test</div>
      </TabsContent>
      <TabsContent value="all_supply" className="w-full flex justify-center">
        <div className="w-full">
          <DataTable
            data={data}
            columns={columns}
            totalPages={pageCount}
            pathname="/supply"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
