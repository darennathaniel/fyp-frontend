import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import StyledButton from "../../../components/ui/StyledButton";
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader";
import { IProduct } from "@/types/product/IProduct";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-lg">{row.getValue("productId")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("productName")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title="Action"
      />
    ),
    cell: ({ row }) => (
      <Link to={`${row.getValue("productId")}`} className="flex justify-end">
        <StyledButton text="More Info" />
      </Link>
    ),
  },
];
