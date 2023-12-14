import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import StyledButton from "../../../components/ui/StyledButton";
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { IProduct } from "@/types/product/IProduct";

export const columns: ColumnDef<ISupplyMongo>[] = [
  {
    accessorKey: "supplyId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-lg">{row.getValue("supplyId")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("productId")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("product") as IProduct).productName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Quantity Supplied" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("quantity") as number).toString()}
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
      <Link
        to={`/supply/${row.getValue("supplyId")}`}
        className="flex justify-end"
      >
        <StyledButton text="More Info" />
      </Link>
    ),
  },
];
