import { ColumnDef } from "@tanstack/react-table";
import ConfirmationButton from "@/components/ConfirmationButton";
import { useError } from "@/hooks/useError";
import { useSuccess } from "@/hooks/useSuccess";
import { useLoading } from "@/hooks/useLoading";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import StyledButton from "@/components/ui/StyledButton";
import {
  IProductRequest,
  IProductRequestTableMeta,
} from "@/types/request/IRequest";
import { useRequest } from "@/hooks/useRequest";

export const incomingColumns: ColumnDef<IProductRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.original._id}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.productName}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.company}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "existing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Existing Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.existing ? (
              <Badge className="bg-green-900">YES</Badge>
            ) : (
              <Badge className="bg-red-900">NO</Badge>
            )}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row, table }) => {
      const { approveProductRequest, declineProductRequest } = useRequest();
      const { data, setData } = table.options.meta as IProductRequestTableMeta;
      const { showError } = useError();
      const { showSuccess } = useSuccess();
      const { showLoading, closeLoading } = useLoading();
      return (
        <div className="space-x-3">
          <ConfirmationButton
            onConfirmClick={() => {
              showLoading();
              approveProductRequest(row.original._id)
                .then((res) => {
                  const newData = data.filter(
                    (request) => request._id !== row.original._id
                  );
                  setData(newData);
                  showSuccess(res);
                })
                .catch((err) => showError(err))
                .finally(() => closeLoading());
            }}
            onCancelClick={() => {}}
          >
            <StyledButton className="p-1 h-8 text-xs">Approve</StyledButton>
          </ConfirmationButton>
          <ConfirmationButton
            onConfirmClick={async () => {
              showLoading();
              declineProductRequest(row.original._id)
                .then((res) => {
                  const newData = data.filter(
                    (request) => request._id !== row.getValue("id")
                  );
                  setData(newData);
                  showSuccess(res);
                })
                .catch((err) => showError(err))
                .finally(() => closeLoading());
            }}
            onCancelClick={() => {}}
            triggerClassName="bg-red-800"
          >
            <StyledButton className="p-1 h-8 text-xs">Decline</StyledButton>
          </ConfirmationButton>
        </div>
      );
    },
  },
];

export const outgoingColumns: ColumnDef<IProductRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.original._id}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.productName}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "existing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Existing Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.existing ? (
              <Badge className="bg-green-900">YES</Badge>
            ) : (
              <Badge className="bg-red-900">NO</Badge>
            )}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            <Badge className="bg-gray-700">
              {row.original.progress.toUpperCase()}
            </Badge>
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
];

export const historyColumns: ColumnDef<IProductRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.original._id}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.productName}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.company}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "existing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Existing Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.existing ? (
              <Badge className="bg-green-900">YES</Badge>
            ) : (
              <Badge className="bg-red-900">NO</Badge>
            )}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.progress === "declined" ? (
              <Badge className="bg-red-900">
                {row.original.progress.toUpperCase()}
              </Badge>
            ) : (
              <Badge className="bg-green-900">
                {row.original.progress.toUpperCase()}
              </Badge>
            )}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
];
