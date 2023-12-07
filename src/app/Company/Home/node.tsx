import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { ICompany } from "@/types/company/ICompany";
import { Handle, NodeProps, Position } from "@reactflow/core";
import { Link } from "react-router-dom";

interface CustomNodeData {
  label: string;
  meta: ICompany;
}

export default function CustomNode(props: NodeProps) {
  const isConnectable = props.isConnectable;
  const data: CustomNodeData = props.data;
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
      />
      <Popover>
        <PopoverTrigger>
          <StyledButton className="bg-zinc-950 border border-white rounded-md w-fit text-center">
            {data.label}
          </StyledButton>
        </PopoverTrigger>
        <PopoverContent className="w-fit border-none">
          <Card className="w-full bg-zinc-950 text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{data.meta.name}</CardTitle>
              <CardDescription>
                Brief information about the company
              </CardDescription>
              <Separator className="bg-white" />
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex flex-col">
                <div className="font-semibold">Wallet Address</div>
                <div className="text-zinc-400 text-ellipsis text-sm overflow-hidden">
                  {data.meta.owner}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Number of Products</div>
                <div className="text-zinc-400 text-ellipsis text-sm overflow-hidden">
                  {data.meta.listOfSupply.length}
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid gap-2">
              <Link to={data.meta.owner} className="flex justify-end">
                <StyledButton text="Click to view more!" />
              </Link>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
}
