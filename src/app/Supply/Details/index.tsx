import { DataTable } from "@/components/DataTable";
import DetailsHeader from "@/components/DetailsHeader";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useSupply } from "@/hooks/useSupply";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { columns } from "./columns";
import CustomNode from "./nodes";

const nodeTypes = {
  customNode: CustomNode,
};

export default function SupplyDetails() {
  const { id } = useParams();
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { getSupply } = useSupply();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [supply, setSupply] = useState<ISupplyMongo>();
  const [history, setHistory] = useState<ISupplyMongo[]>([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  useEffect(() => {
    showLoading();
    getSupply(id ?? "0")
      .then((response) => {
        setNodes(response.supplies);
        setEdges(response.edges);
        setSupply(response.supplies[0].data.meta);
        setHistory(response.supplies);
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
          Supply ID: {supply?.supplyId}
        </div>
        <div className="font-medium max-md:w-40 overflow-x-hidden text-ellipsis text-sm text-zinc-400">
          Product: {supply?.product.productName} - {supply?.product.productId}
        </div>
      </div>
      <DetailsHeader title="Graph"></DetailsHeader>
      <div className="w-3/4 h-96 lg:h-[calc(100vh-20rem)] flex flex-col self-center p-2">
        <ReactFlow
          className="bg-zinc-700 border-white border-2 rounded-xl shadow-zinc-500 shadow-md"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          connectOnClick={false}
          nodeTypes={nodeTypes}
        ></ReactFlow>
      </div>
      <DetailsHeader title="History Supply" />
      <div className="w-full h-1/2 lg:min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <div className="w-3/4">
          <DataTable columns={columns} data={history} />
        </div>
      </div>
    </div>
  );
}
