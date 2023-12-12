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
import { useSuccess } from "@/hooks/useSuccess";
import { useSupply } from "@/hooks/useSupply";
import { IConvertToSupplyDialog } from "@/types/dialog/IDialog";
import { IProduct } from "@/types/product/IProduct";
import { IConvertToSupplyForm } from "@/types/supply/IConvertToSupplyForm";
import { ISupply } from "@/types/supply/ISupply";
import { ISupplyMongo } from "@/types/supply/ISupplyMongo";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

export default function ConvertToSupplyDialog({
  children,
  product,
  data,
  setData,
}: IConvertToSupplyDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const { convertToSupply } = useSupply();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { quantity } = e.target as typeof e.target & IConvertToSupplyForm;
      const response = await convertToSupply(product.productId, quantity.value);
      const responseData = response.data.data[0] as ISupplyMongo;
      const newData = data.map((product) => {
        if (product.productId === responseData.productId) {
          return { ...product, total: product.total + responseData.quantity };
        } else {
          return product;
        }
      });
      setData(newData);
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
          <DialogTitle>Convert to Supply</DialogTitle>
          <DialogDescription>
            Add supply to your current product by pressing Supply.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                required
                id="productId"
                type="text"
                value={product.productId}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                required
                id="productName"
                type="text"
                value={product.productName}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                required
                id="quantity"
                type="number"
                className="bg-zinc-950 text-white"
              />
            </div>
          </div>
          <Separator className="bg-white my-4" />
          <DialogFooter>
            <StyledButton text="Supply" type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
