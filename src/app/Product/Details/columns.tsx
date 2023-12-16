import { ICompany } from "@/types/company/ICompany";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import StyledButton from "../../../components/ui/StyledButton";
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader";

export const columns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-lg">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("owner")}
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
      <Link to={`${row.getValue("owner")}`} className="flex justify-end">
        <StyledButton text="More Info" />
      </Link>
    ),
  },
];
