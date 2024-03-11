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
import { useProduct } from "@/hooks/useProduct";
import { useSuccess } from "@/hooks/useSuccess";
import { ISendContractHomeDialog } from "@/types/dialog/IDialog";
import { IProduct } from "@/types/product/IProduct";
import { ISupply } from "@/types/supply/ISupply";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function SendContractHomeDialog({
  children,
  companies,
}: ISendContractHomeDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const user = useAppSelector((state) => state.app.user);
  const { sendContract } = useContract();
  const [product, setProduct] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [products, setProducts] = useState<(IProduct & ISupply)[]>([]);
  const { getProductByCompany } = useProduct();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const response = await sendContract(company, parseInt(product));
      showSuccess(response);
      setOpen(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        showError(err);
      }
    } finally {
      closeLoading();
    }
  };
  useEffect(() => {
    if (company.length !== 0)
      getProductByCompany(company)
        .then((response) => {
          setProducts(response);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            showError(err);
          }
        })
        .finally(() => closeLoading());
  }, [company]);
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
              <Label htmlFor="companies">Companies</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger className="max-w-full truncate">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 truncate text-white max-w-full">
                  <SelectGroup>
                    {companies.length > 0 ? (
                      companies.map((company) => (
                        <SelectItem
                          value={company.owner}
                          className="hover:bg-zinc-700 transition"
                        >
                          {company.name} - {company.owner}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel>No available products.</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product">Products</Label>
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
