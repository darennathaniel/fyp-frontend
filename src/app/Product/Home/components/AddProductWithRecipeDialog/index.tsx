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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { useSuccess } from "@/hooks/useSuccess";
import { IProductDialog } from "@/types/dialog/IDialog";
import { IAddProductForm, IProduct, IRecipe } from "@/types/product/IProduct";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function AddProductWithRecipeDialog({
  data,
  setData,
  allData,
  setAllData,
  children,
}: IProductDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([
    { productId: undefined, productName: undefined, quantity: undefined },
  ]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { getAllProducts, addProductWithRecipe } = useProduct();
  const { showError } = useError();
  const { showLoading, closeLoading } = useLoading();
  const { showSuccess } = useSuccess();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { productName } = e.target as typeof e.target & IAddProductForm;
      const response = await addProductWithRecipe(productName.value, recipes);
      showSuccess(response);
      setData([...data, response.data.data[0]]);
      if (allData && setAllData)
        setAllData([...allData, response.data.data[0]]);
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
    showLoading();
    getAllProducts()
      .then((response) => setProducts(response))
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
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
              <Label htmlFor="productName">Product Name</Label>
              <Input
                required
                id="productName"
                type="text"
                className="bg-zinc-950 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Recipes</Label>
              {recipes.map((recipe, idx) => (
                <div className="grid grid-cols-6 gap-2">
                  <Select
                    required
                    value={`${recipe.productId?.toString()}-${
                      recipe.productName
                    }`}
                    onValueChange={(value) => {
                      const splitted_value = value.split("-");
                      const productId = parseInt(splitted_value[0]);
                      const productName = splitted_value[1];
                      const newRecipes = recipes.map(
                        (newRecipe, newRecipeIdx) => {
                          if (newRecipeIdx === idx) {
                            return {
                              productId: productId,
                              productName: productName,
                              quantity: newRecipe.quantity,
                            };
                          } else {
                            return newRecipe;
                          }
                        }
                      );
                      setRecipes([...newRecipes]);
                    }}
                  >
                    <SelectTrigger className="col-span-4">
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
                  <Input
                    required
                    id="quantity"
                    type="number"
                    className="bg-zinc-950 text-white"
                    onChange={(e) => {
                      const newRecipes = recipes.map(
                        (newRecipe, newRecipeIdx) => {
                          if (newRecipeIdx === idx) {
                            return {
                              productId: newRecipe.productId,
                              productName: newRecipe.productName,
                              quantity: parseInt(e.target.value),
                            };
                          } else {
                            return newRecipe;
                          }
                        }
                      );
                      setRecipes([...newRecipes]);
                    }}
                  />
                  <StyledButton
                    onClick={() => {
                      const newRecipes = recipes;
                      newRecipes.splice(idx, 1);
                      setRecipes([...newRecipes]);
                    }}
                    type="button"
                  >
                    Delete
                  </StyledButton>
                </div>
              ))}
              <StyledButton
                type="button"
                onClick={() => {
                  setRecipes([
                    ...recipes,
                    {
                      productId: undefined,
                      productName: undefined,
                    },
                  ]);
                }}
              >
                Add Recipe
              </StyledButton>
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
