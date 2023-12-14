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
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { useCompany } from "@/hooks/useCompany";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { useSuccess } from "@/hooks/useSuccess";
import { ICompany } from "@/types/company/ICompany";
import { IProductDialog } from "@/types/dialog/IDialog";
import { IAddProductForm } from "@/types/product/IProduct";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function AddProductWithoutRecipeDialog({
  children,
  allData,
  setAllData,
}: IProductDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const { getAllCompany } = useCompany();
  const { addProductWithoutRecipe } = useProduct();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  useEffect(() => {
    showLoading();
    getAllCompany()
      .then((response) => {
        setCompanies(response.companies);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { productName } = e.target as typeof e.target & IAddProductForm;
      const response = await addProductWithoutRecipe(
        productName.value,
        selectedCompany
      );
      showSuccess(response);
      if (allData && setAllData)
        setAllData([...allData, response.data.data[0]]);
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
          <DialogTitle>Add Product Without Recipe</DialogTitle>
          <DialogDescription>
            Add product without recipe to a designated company by clicking Add.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                required
                id="productName"
                type="text"
                className="bg-zinc-950 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Select
                required
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 text-white">
                  <SelectGroup>
                    {companies.length > 0 ? (
                      companies.map((company) => (
                        <SelectItem
                          value={company.owner}
                          className="hover:bg-zinc-700 transition overflow-hidden text-ellipsis"
                        >
                          {company.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel>No companies.</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="bg-white my-4" />
          <DialogFooter>
            <StyledButton text="Add" type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
