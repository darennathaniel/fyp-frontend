import { DataTable } from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useRequest } from "@/hooks/useRequest";
import { IRequestHistory, IRequestTable } from "@/types/request/IRequest";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { incomingColumns, outgoingColumns, historyColumns } from "./columns";

export default function ProfileRequestSupply() {
  const [tab, setTab] = useState<string>("incoming");
  const [incomingData, setIncomingData] = useState<IRequestTable[]>([]);
  const [outgoingData, setOutgoingData] = useState<IRequestTable[]>([]);
  const [historyData, setHistoryData] = useState<IRequestHistory[]>([]);

  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { getIncomingRequest, getOutgoingRequest, getHistoryRequest } =
    useRequest();

  useEffect(() => {
    showLoading();
    if (tab === "incoming") {
      getIncomingRequest()
        .then((result) => setIncomingData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    } else if (tab === "outgoing") {
      getOutgoingRequest()
        .then((result) => setOutgoingData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    } else {
      getHistoryRequest()
        .then((result) => setHistoryData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Supply Request"
        subtitle="View, approve, or decline Supply Request from company partners"
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
              limit={10}
              meta={{
                data: incomingData,
                setData: setIncomingData,
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="outgoing" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable
              data={outgoingData}
              columns={outgoingColumns}
              limit={10}
            />
          </div>
        </TabsContent>
        <TabsContent value="history" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable data={historyData} columns={historyColumns} limit={10} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
