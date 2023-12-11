import { DataTable } from "@/components/DataTable";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useContract } from "@/hooks/useContract";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { IContractHistory, IContractTable } from "@/types/contract/IContract";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import { historyColumns, incomingColumns, outgoingColumns } from "./columns";

export default function ProfileContract() {
  const [outgoingData, setOutgoingData] = useState<IContractTable[]>([]);
  const [incomingData, setIncomingData] = useState<IContractTable[]>([]);
  const [historyData, setHistoryData] = useState<IContractHistory[]>([]);
  const [tab, setTab] = useState<string>("incoming");
  const { getIncomingContract, getOutgoingContract, getHistoryContract } =
    useContract();
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();

  useEffect(() => {
    showLoading();
    if (tab === "incoming") {
      getIncomingContract()
        .then((result) => setIncomingData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    } else if (tab === "outgoing") {
      getOutgoingContract()
        .then((result) => setOutgoingData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    } else {
      getHistoryContract()
        .then((result) => setHistoryData(result))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    }
  }, [tab]);
  return (
    <div className="space-y-6 w-full">
      <ProfileHeader
        title="Contract"
        subtitle="View, approve, and decline contracts from other companies"
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
