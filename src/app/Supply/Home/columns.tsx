import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { IProduct } from "@/types/product/IProduct";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "quantityLeft",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantityLeft")}
          </span>
        </div>
      );
    },
  },
];
