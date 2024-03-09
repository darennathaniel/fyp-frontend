import { DataTable } from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import {
  IHistoryDeleteRequestTable,
  IIncomingDeleteRequestTable,
  IOutgoingDeleteRequestTable,
} from "@/types/product/IProduct";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { incomingColumns, outgoingColumns, historyColumns } from "./columns";

export default function ProfileRequestDelete() {
  const [outgoingData, setOutgoingData] = useState<
    IOutgoingDeleteRequestTable[]
  >([]);
  const [incomingData, setIncomingData] = useState<
    IIncomingDeleteRequestTable[]
  >([]);
  const [historyData, setHistoryData] = useState<IHistoryDeleteRequestTable[]>(
    []
  );
  const [tab, setTab] = useState<string>("incoming");
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const {
    getIncomingDeleteRequest,
    getOutgoingDeleteRequest,
    getHistoryDeleteRequest,
  } = useProduct();
  useEffect(() => {
    showLoading();
    getIncomingDeleteRequest()
      .then((response) => {
        setIncomingData(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      });
    getOutgoingDeleteRequest()
      .then((response) => {
        setOutgoingData(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      });
    getHistoryDeleteRequest()
      .then((response) => {
        setHistoryData(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Delete Request"
        subtitle="View, approve, or decline Delete Request from company partners"
      />
      <Tabs
        className="w-full items-center flex flex-col space-y-6"
        value={tab}
        onValueChange={(value) => setTab(value)}
      >
        <TabsList className="md:w-1/2 w-3/5 bg-zinc-700">
          <TabsTrigger
            value="incoming"
            className="rounded-lg text-gray-400 hover:text-white w-1/3 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Incoming
          </TabsTrigger>
          <TabsTrigger
            value="outgoing"
            className="w-1/3 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Outgoing
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="w-1/3 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="incoming" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable
              data={incomingData}
              columns={incomingColumns}
              meta={{
                data: incomingData,
                setData: setIncomingData,
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="outgoing" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable data={outgoingData} columns={outgoingColumns} />
          </div>
        </TabsContent>
        <TabsContent value="history" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable data={historyData} columns={historyColumns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
