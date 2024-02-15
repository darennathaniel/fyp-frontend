import { DataTable } from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useRequest } from "@/hooks/useRequest";
import { IProductRequest } from "@/types/request/IRequest";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { incomingColumns, outgoingColumns, historyColumns } from "./columns";

export default function ProfileRequestProduct() {
  const [data, setData] = useState<IProductRequest[]>([]);
  const [historyData, setHistoryData] = useState<IProductRequest[]>([]);
  const user = useAppSelector((state) => state.app.user);
  const [tab, setTab] = useState<string>(
    user.isOwner ? "incoming" : "outgoing"
  );
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { getProductRequest, getHistoryProductRequest } = useRequest();

  useEffect(() => {
    showLoading();
    if (tab === "history") {
      getHistoryProductRequest()
        .then((response) => setHistoryData(response))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    } else {
      getProductRequest()
        .then((response) => setData(response))
        .catch((err) => {
          if (err instanceof AxiosError) showError(err);
        })
        .finally(() => closeLoading());
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Product Request"
        subtitle="View, approve, or decline Product Request from companies."
      />
      <Tabs
        className="w-full items-center flex flex-col space-y-6"
        value={tab}
        onValueChange={(value) => setTab(value)}
      >
        <TabsList className="md:w-1/2 w-3/5 bg-zinc-700">
          {user.isOwner ? (
            <TabsTrigger
              value="incoming"
              className="rounded-lg text-gray-400 hover:text-white w-1/2 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Incoming
            </TabsTrigger>
          ) : (
            <TabsTrigger
              value="outgoing"
              className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Outgoing
            </TabsTrigger>
          )}
          <TabsTrigger
            value="history"
            className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            History
          </TabsTrigger>
        </TabsList>
        {user.isOwner ? (
          <TabsContent value="incoming" className="w-full flex justify-center">
            <div className="w-full">
              <DataTable
                data={data}
                columns={incomingColumns}
                meta={{
                  data,
                  setData,
                }}
              />
            </div>
          </TabsContent>
        ) : (
          <TabsContent value="outgoing" className="w-full flex justify-center">
            <div className="w-full">
              <DataTable data={data} columns={outgoingColumns} />
            </div>
          </TabsContent>
        )}
        <TabsContent value="history" className="w-full flex justify-center">
          <div className="w-full">
            <DataTable data={historyData} columns={historyColumns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
