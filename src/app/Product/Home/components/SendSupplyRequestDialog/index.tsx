import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useRequest } from "@/hooks/useRequest";
import { useSuccess } from "@/hooks/useSuccess";
import { ISendSupplyRequestDialog } from "@/types/dialog/IDialog";
import { ISendSupplyRequestForm } from "@/types/product/IProduct";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

export default function SendSupplyRequestDialog({
  children,
  product,
  owner,
  company_name,
}: ISendSupplyRequestDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { sendRequest } = useRequest();
  const { showSuccess } = useSuccess();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { quantity } = e.target as typeof e.target & ISendSupplyRequestForm;
      const response = await sendRequest(
        owner,
        product.productId,
        quantity.value
      );
      showSuccess(response);
      setOpen(false);
    } catch (err) {
      if (err instanceof AxiosError) showError(err);
    } finally {
      closeLoading();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>Send Supply Request</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productName">Product ID</Label>
              <Input
                required
                id="productId"
                type="text"
                className="bg-zinc-950 text-white"
                disabled
                value={product.productId}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                required
                id="productName"
                type="text"
                className="bg-zinc-950 text-white"
                disabled
                value={product.productName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="owner">Company Owner</Label>
              <Input
                required
                id="owner"
                type="text"
                className="bg-zinc-950 text-white"
                disabled
                value={company_name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productName">Supply Quantity</Label>
              <Input
                required
                id="quantity"
                type="number"
                className="bg-zinc-950 text-white"
              />
            </div>
            <div className="text-xs text-red-400">
              NOTE: Approval from product owner is needed!
            </div>
          </div>
          <Separator className="bg-white my-4" />
          <DialogFooter>
            <StyledButton text="Request" type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
