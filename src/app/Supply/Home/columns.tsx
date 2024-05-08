import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import StyledButton from "@/components/ui/StyledButton";
import { IProduct } from "@/types/product/IProduct";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<ISupplyMongo>[] = [
  {
    accessorKey: "supplyId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("supplyId")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("product") as IProduct).productName} -{" "}
            {(row.getValue("product") as IProduct).productId}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.user.company_name} - {row.original.owner}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply Timestamp" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.timestamp);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {date.toUTCString()}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return (
        <Link to={`${row.getValue("supplyId")}`}>
          <StyledButton text="More Info" />
        </Link>
      );
    },
  },
];
