import { DataTable } from "@/components/DataTable";
import StyledButton from "@/components/ui/StyledButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useCompany } from "@/hooks/useCompany";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { ICompany } from "@/types/company/ICompany";
import { IProduct } from "@/types/product/IProduct";
import { ISupply } from "@/types/supply/ISupply";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
} from "@reactflow/core";
import { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import CompanyDetailsHeader from "../components/CompanyDetailsHeader";
import SendContractDialog from "../components/SendContractDialog";
import { prerequisiteColumns, productColumns } from "./columns";

export default function CompanyDetails() {
  const { owner } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [company, setCompany] = useState<ICompany>();
  const [product, setProduct] = useState<(IProduct & ISupply)[]>([]);
  const [prerequisite, setPrerequisite] = useState<
    (IProduct & ISupply & { owner: string })[]
  >([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  const { showError } = useError();
  const { showLoading, closeLoading } = useLoading();
  const { getCompany } = useCompany();
  const { getProductByCompany, getPrerequisiteByCompany } = useProduct();
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    showLoading();
    getCompany(owner as string)
      .then((response) => {
        const company = response[1].companies;
        const edges = response[1].edges;
        setNodes(company);
        setEdges(edges);
        setCompany(response[0]);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          showError(err);
        }
      })
      .finally(() => closeLoading());
    showLoading();
    getProductByCompany(owner as string)
      .then((response) => {
        setProduct(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          showError(err);
        }
      })
      .finally(() => closeLoading());
    showLoading();
    getPrerequisiteByCompany(owner as string)
      .then((response) => {
        setPrerequisite(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          showError(err);
        }
      })
      .finally(() => closeLoading());
  }, []);
  return (
    <div className="px-4 py-2 space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-2xl">{company?.name}</div>
          <div className="font-medium max-md:w-40 overflow-x-hidden text-ellipsis text-sm text-zinc-400">
            {company?.owner}
          </div>
        </div>
        {user.isAuthenticated && user.wallet_address !== company?.owner ? (
          <SendContractDialog
            to={{
              company_name: company?.name ?? "",
              wallet_address: company?.owner ?? "",
            }}
            products={product.filter(
              (prod) =>
                !company?.upstream.some(
                  (upstream) =>
                    upstream.companyId === user.wallet_address &&
                    upstream.productId === prod.productId
                )
            )}
          >
            <StyledButton text="Send Contract" />
          </SendContractDialog>
        ) : (
          <></>
        )}
      </div>
      <CompanyDetailsHeader title="Graph" />
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
        ></ReactFlow>
      </div>
      <CompanyDetailsHeader title="Product Supply" />
      <div className="w-full h-1/2 lg:min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <div className="w-3/4">
          <DataTable columns={productColumns} data={product ?? []} limit={10} />
        </div>
      </div>
      <CompanyDetailsHeader title="Prerequisite" />
      <div className="w-full h-1/2 lg:min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <div className="w-3/4">
          <DataTable
            columns={prerequisiteColumns}
            data={prerequisite ?? []}
            limit={10}
          />
        </div>
      </div>
    </div>
  );
}
