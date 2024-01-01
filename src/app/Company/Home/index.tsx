import { useEffect, useState, useCallback } from "react";
import ReactFlow, { addEdge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import { useCompany } from "@/hooks/useCompany";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/app/Company/Home/columns";
import { Button } from "@/components/ui/button";
import AddCompanyDialog from "../components/AddCompanyDialog";
import { ICompany } from "@/types/company/ICompany";
import { useAppSelector } from "@/hooks/useAppSelector";
import CustomNode from "./node";
import PageHeader from "@/components/PageHeader";

const nodeTypes = {
  customNode: CustomNode,
};

export default function CompanyHome() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [data, setData] = useState<ICompany[]>();
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  const user = useAppSelector((state) => state.app.user);
  const { getAllCompany } = useCompany();
  useEffect(() => {
    getAllCompany().then((result) => {
      const companies = result[1].companies;
      const edges = result[1].edges;
      setNodes(companies);
      setEdges(edges);
      setData(result[0]);
    });
  }, []);
  return (
    <Tabs className="w-full items-center flex flex-col" defaultValue="graph">
      <div className="h-16 w-3/4 flex justify-between items-center">
        <Button className="w-28 cursor-default hidden md:block"></Button>
        <TabsList className="md:w-1/3 w-3/5 bg-zinc-700">
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
        {user.isOwner ? (
          <AddCompanyDialog>
            <Button
              type="button"
              variant="outline"
              className="hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950 w-28"
            >
              Add Company
            </Button>
          </AddCompanyDialog>
        ) : (
          <Button className="w-28 cursor-default hidden md:block"></Button>
        )}
      </div>
      <TabsContent
        value="graph"
        className="w-full flex justify-center items-center flex-col"
      >
        <div className="w-3/4">
          <PageHeader
            title="All Company Graph"
            description="Below is a graph showing the dependencies of each company."
          />
        </div>
        <div className="h-[calc(100vh-9rem)] w-3/4 p-2">
          <ReactFlow
            className="bg-zinc-700 border-white border-2 rounded-xl shadow-zinc-500 shadow-md"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectOnClick={false}
            fitView
          ></ReactFlow>
        </div>
      </TabsContent>
      <TabsContent
        value="table"
        className="w-full flex justify-center flex-col items-center"
      >
        <div className="w-3/4">
          <PageHeader
            title="List of All Company"
            description="Below is a table listing all companies that is currently active."
          />
        </div>
        <div className="w-3/4 p-2">
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
