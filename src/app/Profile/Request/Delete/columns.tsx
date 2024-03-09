import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/user/IUser";
import ConfirmationButton from "@/components/ConfirmationButton";
import {
  IDeleteRequestTableMeta,
  IHistoryDeleteRequestTable,
  IIncomingDeleteRequestTable,
  IOutgoingDeleteRequestTable,
  IProduct,
} from "@/types/product/IProduct";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useSuccess } from "@/hooks/useSuccess";
import { useLoading } from "@/hooks/useLoading";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import StyledButton from "@/components/ui/StyledButton";
import { useProduct } from "@/hooks/useProduct";
import { AxiosError } from "axios";

export const incomingColumns: ColumnDef<IIncomingDeleteRequestTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
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
            {row.original.owner.company_name} -{" "}
            {row.original.owner.wallet_address}
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
            {row.original.owner.email}
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
            {row.original.product.productId} -{" "}
            {row.original.product.productName}
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
      const { data, setData } = table.options.meta as IDeleteRequestTableMeta;
      const { showError } = useError();
      const { showSuccess } = useSuccess();
      const { showLoading, closeLoading } = useLoading();
      const { approveDeleteProduct, declineDeleteProduct } = useProduct();
      return (
        <div className="space-x-3">
          <ConfirmationButton
            onConfirmClick={() => {
              showLoading();
              approveDeleteProduct(
                row.original.id,
                row.original.product.productId,
                row.original.code,
                row.original.owner.wallet_address
              )
                .then((response) => {
                  showSuccess(response);
                  const filteredData = data.filter(
                    (request) => request.id !== row.original.id
                  );
                  setData(filteredData);
                })
                .catch((err) => {
                  if (err instanceof AxiosError) showError(err);
                })
                .finally(() => closeLoading());
            }}
            onCancelClick={() => {}}
          >
            <StyledButton className="p-1 h-8 text-xs">Approve</StyledButton>
          </ConfirmationButton>
          <ConfirmationButton
            onConfirmClick={() => {
              showLoading();
              declineDeleteProduct(
                row.original.id,
                row.original.product.productId,
                row.original.code
              )
                .then((response) => {
                  showSuccess(response);
                  const filteredData = data.filter(
                    (request) => request.id !== row.original.id
                  );
                  setData(filteredData);
                })
                .catch((err) => {
                  if (err instanceof AxiosError) showError(err);
                })
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

export const outgoingColumns: ColumnDef<IOutgoingDeleteRequestTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
    enableHiding: true,
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
            {row.original.product.productId} -{" "}
            {row.original.product.productName}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "approvals",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Approvals" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium flex space-x-1">
            <p
              className={
                row.original.approvals === row.original.upstream
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {row.original.approvals}
            </p>
            <p>/</p>
            <p>{row.original.upstream}</p>
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
    cell: ({ row }) => {
      const { deleteProduct } = useProduct();
      const { showError } = useError();
      const { showSuccess } = useSuccess();
      const { showLoading, closeLoading } = useLoading();
      return (
        <div className="w-fit">
          {row.original.enough_approval ? (
            <ConfirmationButton
              onConfirmClick={() => {
                showLoading();
                deleteProduct(
                  row.original.id,
                  row.original.product.productId,
                  row.original.code
                )
                  .then((response) => {
                    showSuccess(response);
                    location.reload();
                  })
                  .catch((err) => {
                    if (err instanceof AxiosError) showError(err);
                  })
                  .finally(() => {
                    closeLoading();
                  });
              }}
              onCancelClick={() => {}}
            >
              <StyledButton className="h-8 text-xs bg-red-800">
                Remove from Inventory
              </StyledButton>
            </ConfirmationButton>
          ) : (
            <h1 className="text-zinc-400">Not enough approvals..</h1>
          )}
        </div>
      );
    },
  },
];

export const historyColumns: ColumnDef<IHistoryDeleteRequestTable>[] = [
  {
    accessorKey: "request_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
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
            {row.original.owner.company_name} -{" "}
            {row.original.owner.wallet_address}
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
            {row.original.product.productId} -{" "}
            {row.original.product.productName}
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
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.responder.wallet_address ===
            row.original.owner.wallet_address ? (
              <Badge className="bg-blue-600">OUTGOING</Badge>
            ) : (
              <Badge className="bg-yellow-400">INCOMING</Badge>
            )}
          </span>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
];
