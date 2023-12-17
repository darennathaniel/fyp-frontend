import { ColumnDef } from "@tanstack/react-table";
import { IRecipeDisplay } from "@/types/product/IProduct";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { useState } from "react";
import StyledButton from "@/components/ui/StyledButton";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useError } from "@/hooks/useError";
import { useSuccess } from "@/hooks/useSuccess";
import { useLoading } from "@/hooks/useLoading";
import { AxiosError } from "axios";
import { useRequest } from "@/hooks/useRequest";

export const columns: ColumnDef<IRecipeDisplay>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.original.product.productName} - {row.original.product.productId}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "recipe_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipe" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.recipe_quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inventory_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span
            className={`max-w-[500px] truncate font-medium ${
              row.original.inventory_quantity >= row.original.recipe_quantity
                ? "text-green-800"
                : "text-red-900"
            }`}
          >
            {row.original.inventory_quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "product_owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request" />
    ),
    cell: ({ row }) => {
      const [openSendRequest, setOpenSendRequest] = useState<boolean>(false);
      const [openPopover, setOpenPopover] = useState<boolean>(false);
      const { showError } = useError();
      const { showSuccess } = useSuccess();
      const { showLoading, closeLoading } = useLoading();
      const { sendRequest } = useRequest();
      const [quantity, setQuantity] = useState<number>(0);
      const handleClick = async () => {
        showLoading();
        try {
          const to = row.original.product_owner.companyId;
          const response = await sendRequest(
            to,
            row.original.product.productId,
            quantity
          );
          showSuccess(response);
          setOpenSendRequest(false);
        } catch (err) {
          if (err instanceof AxiosError) showError(err);
        } finally {
          closeLoading();
        }
      };
      return (
        <div className="flex space-x-2">
          {openSendRequest ? (
            <>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                type="number"
                className="bg-zinc-950 text-white w-10"
              />
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger>
                  <StyledButton
                    type="button"
                    className="bg-zinc-950 border border-white rounded-md w-fit text-center"
                  >
                    Send
                  </StyledButton>
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-zinc-950 text-white">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">Are you sure?</div>
                    <StyledButton
                      disabled={quantity === 0 || isNaN(quantity)}
                      type="button"
                      onClick={handleClick}
                    >
                      Yes
                    </StyledButton>
                    <StyledButton
                      type="button"
                      onClick={() => setOpenPopover(false)}
                    >
                      No
                    </StyledButton>
                  </div>
                </PopoverContent>
              </Popover>
              <StyledButton
                type="button"
                onClick={() => setOpenSendRequest(false)}
              >
                Close
              </StyledButton>
            </>
          ) : (
            <StyledButton onClick={() => setOpenSendRequest(true)}>
              Send Request
            </StyledButton>
          )}
        </div>
      );
    },
  },
];
