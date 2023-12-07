import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/user/IUser";
import ConfirmationButton from "@/components/ConfirmationButton";
import { IProduct } from "@/types/product/IProduct";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useSuccess } from "@/hooks/useSuccess";
import { useLoading } from "@/hooks/useLoading";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import StyledButton from "@/components/ui/StyledButton";
import {
  IRequestHistory,
  IRequestTable,
  IRequestTableMeta,
} from "@/types/request/IRequest";
import { useRequest } from "@/hooks/useRequest";

export const incomingColumns: ColumnDef<IRequestTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Sender" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("from") as IUser).company_name} -{" "}
            {(row.getValue("from") as IUser).wallet_address}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("from") as IUser).email}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "productString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("productString")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row, table }) => {
      const { approveRequest, declineRequest } = useRequest();
      const user = useAppSelector((state) => state.app.user);
      const { data, setData } = table.options.meta as IRequestTableMeta;
      const { showError } = useError();
      const { showSuccess } = useSuccess();
      const { showLoading, closeLoading } = useLoading();
      return (
        <div className="space-x-3">
          <ConfirmationButton
            onConfirmClick={() => {
              showLoading();
              approveRequest(
                row.getValue("id"),
                (row.getValue("from") as IUser).wallet_address,
                user.wallet_address,
                (row.getValue("product") as IProduct).productId,
                row.getValue("quantity")
              )
                .then((res) => {
                  const newData = data.filter(
                    (request) => request.id !== row.getValue("id")
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
              declineRequest(
                row.getValue("id"),
                (row.getValue("from") as IUser).wallet_address,
                user.wallet_address,
                (row.getValue("product") as IProduct).productId,
                row.getValue("quantity")
              )
                .then((res) => {
                  const newData = data.filter(
                    (request) => request.id !== row.getValue("id")
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

export const outgoingColumns: ColumnDef<IRequestTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Receiver" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("to") as IUser).company_name} -{" "}
            {(row.getValue("to") as IUser).wallet_address}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("to") as IUser).email}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "productString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("productString")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
];

export const historyColumns: ColumnDef<IRequestHistory>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Sender" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("from") as IUser).company_name} -{" "}
            {(row.getValue("from") as IUser).wallet_address}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Receiver" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-44">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("to") as IUser).company_name} -{" "}
            {(row.getValue("to") as IUser).wallet_address}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "productString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("productString")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request State" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("state") === "rejected" ? (
              <Badge className="bg-red-900">
                {(row.getValue("state") as string).toUpperCase()}
              </Badge>
            ) : (
              <Badge className="bg-green-900">
                {(row.getValue("state") as string).toUpperCase()}
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
