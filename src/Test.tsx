import { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

function App() {
  const [count, setCount] = useState(0);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  useEffect(() => {
    // const login = async () => {
    //   await axios.post(
    //     "http://localhost:4000/user/login",
    //     {
    //       username: "test123",
    //       password: "test123",
    //     },
    //     { withCredentials: true }
    //   );
    //   const getUser = await axios.get("http://localhost:4000/user", {
    //     withCredentials: true,
    //   });
    //   setUser(getUser.data.username);
    // };
    // login();
    const getData = async () => {
      const result = await axios.get(
        "http://localhost:4000/company?company_address=0x95b41Ed9048eaEDD9ED39E08Ad792288c1AA01b3",
        {
          withCredentials: true,
        }
      );
      const companies = result.data.data[1].companies;
      const edges = result.data.data[1].edges;
      setNodes(companies);
      setEdges(edges);
    };
    getData();
  }, []);
  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <div style={{ height: 1000, width: 1000 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // defaultNodes={nodes}
        // defaultEdges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* <MiniMap style={{ height: 500, width: 500 }} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} /> */}
      </ReactFlow>
    </div>
  );
}

export default App;
