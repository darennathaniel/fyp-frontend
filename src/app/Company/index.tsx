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

export default function Company() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  const getCompany = useCompany();
  useEffect(() => {
    // const getData = async () => {
    //   const result = await axios.get("http://localhost:4000/company", {
    //     withCredentials: true,
    //   });
    //   const companies = result.data.data[1].companies;
    //   const edges = result.data.data[1].edges;
    //   setNodes(companies);
    //   setEdges(edges);
    // };
    // getData();
    getCompany();
  }, []);
  return (
    <div>
      <Tabs className="w-full" defaultValue="graph">
        <div className="h-16 flex justify-center items-center">
          <TabsList className="w-1/3 bg-gray-600">
            <TabsTrigger
              value="graph"
              className="rounded-lg w-1/2 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Graph
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="w-1/2 rounded-lg h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Table
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="graph" className="w-full flex justify-center">
          <div className="h-[calc(100vh-5rem)] w-3/4 p-2">
            <ReactFlow
              className="bg-gray-400 border-white border-2 rounded-xl shadow-white shadow-md"
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
          <div className="w-3/4 p-2">
            <DataTable
              columns={[
                {
                  id: "TASK-8782",
                  title:
                    "You can't compress the program without quantifying the open-source SSD pixel!",
                  status: "in progress",
                  label: "documentation",
                  priority: "medium",
                },
              ]}
              data={[
                {
                  id: "TASK-8782",
                  title:
                    "You can't compress the program without quantifying the open-source SSD pixel!",
                  status: "in progress",
                  label: "documentation",
                  priority: "medium",
                },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
