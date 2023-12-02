import { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCompany } from "@/hooks/useCompany";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/app/Company/Home/columns";
import { Button } from "@/components/ui/button";
import AddCompanyDialog from "../components/AddCompanyDialog";
import { ICompany } from "@/types/company/ICompany";

export default function CompanyHome() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [data, setData] = useState<ICompany[]>();
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  const { getAllCompany } = useCompany();
  useEffect(() => {
    getAllCompany().then((result) => {
      const companies = result.companies;
      const edges = result.edges;
      setNodes(companies);
      setEdges(edges);
      setData(companies);
    });
  }, []);
  return (
    <div>
      <Tabs className="w-full items-center flex flex-col" defaultValue="graph">
        <div className="h-16 w-3/4 flex md:justify-between items-center">
          <Button className="w-28 cursor-default"></Button>
          <TabsList className="w-1/3 bg-zinc-700">
            <TabsTrigger
              value="graph"
              className="rounded-lg text-gray-400 hover:text-white w-1/2 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Graph
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Table
            </TabsTrigger>
          </TabsList>
          <AddCompanyDialog>
            <Button
              type="button"
              variant="outline"
              className="hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950 w-28"
            >
              Add Company
            </Button>
          </AddCompanyDialog>
        </div>
        <TabsContent value="graph" className="w-full flex justify-center">
          <div className="h-[calc(100vh-9rem)] w-3/4 p-2">
            <ReactFlow
              className="bg-zinc-700 border-white border-2 rounded-xl shadow-zinc-500 shadow-md"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            ></ReactFlow>
          </div>
        </TabsContent>
        <TabsContent value="table" className="w-full flex justify-center">
          <div className="h-[calc(100vh-9rem)] w-3/4 p-2">
            <DataTable columns={columns} data={data ?? []} limit={10} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
