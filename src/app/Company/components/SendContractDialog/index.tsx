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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useContract } from "@/hooks/useContract";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useSuccess } from "@/hooks/useSuccess";
import { ISendContractDialog } from "@/types/dialog/IDialog";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

export default function SendContractDialog({
  children,
  to,
  products,
}: ISendContractDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const user = useAppSelector((state) => state.app.user);
  const { sendContract } = useContract();
  const [product, setProduct] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const response = await sendContract(to.wallet_address, parseInt(product));
      showSuccess(response);
      setOpen(false);
      location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        showError(err);
      }
    } finally {
      closeLoading();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>Send a new contract</DialogTitle>
          <DialogDescription>
            Send contract to request for owner's supply here. Click send when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">From (You)</Label>
              <Input
                required
                id="company_name"
                type="text"
                value={user.company_name}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">To</Label>
              <Input
                required
                id="username"
                type="text"
                value={to.company_name}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Products</Label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 text-white">
                  <SelectGroup>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <SelectItem
                          value={product.productId.toString()}
                          className="hover:bg-zinc-700 transition"
                        >
                          {product.productId} - {product.productName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel>No available products.</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="bg-white my-4" />
          <DialogFooter>
            <StyledButton text="Send" type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
