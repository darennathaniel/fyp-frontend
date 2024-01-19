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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { useSuccess } from "@/hooks/useSuccess";
import { IProductDialog } from "@/types/dialog/IDialog";
import { IAddProductForm, IProduct } from "@/types/product/IProduct";
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
  const {
    addProductOwnerWithoutRecipe,
    addProductWithoutRecipe,
    getAllProductsNoRecipe,
  } = useProduct();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [radio, setRadio] = useState<string>("new");
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    showLoading();
    getAllProductsNoRecipe(user.wallet_address)
      .then((response) => setProducts(response))
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      if (selectedProduct !== undefined && radio === "exist") {
        const response = await addProductOwnerWithoutRecipe(
          selectedProduct ?? ""
        );
        showSuccess(response);
        if (allData && setAllData)
          setAllData([...allData, response.data.data[0]]);
        setOpen(false);
      } else {
        const { productName } = e.target as typeof e.target & IAddProductForm;
        const response = await addProductWithoutRecipe(productName.value);
        showSuccess(response);
        if (allData && setAllData)
          setAllData([...allData, response.data.data[0]]);
        setOpen(false);
      }
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
            Create a new product that is not dependant towards another product!
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <RadioGroup onValueChange={setRadio} value={radio}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="r1" />
                <Label htmlFor="r1">New Product</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exist" id="r2" />
                <Label htmlFor="r2">Existing Product</Label>
              </div>
            </RadioGroup>
            {radio === "new" ? (
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  required
                  id="productName"
                  type="text"
                  className="bg-zinc-950 text-white"
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="productName">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 text-white">
                    <SelectGroup>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <SelectItem
                            value={`${product.productId.toString()}-${
                              product.productName
                            }`}
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
            )}
            <div className="text-xs text-red-400">
              NOTE: Approval from network owner is needed!
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
