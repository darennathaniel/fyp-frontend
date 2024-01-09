import { DataTable } from "@/components/DataTable";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { IConvertToSupplyDialog } from "@/types/dialog/IDialog";
import { IRecipeDisplay, IRecipeSupplyDisplay } from "@/types/product/IProduct";
import { DialogClose } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { recipeColumns, supplyColumns } from "./columns";

export default function RecipesDialog({
  children,
  product,
}: IConvertToSupplyDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<IRecipeDisplay[]>([]);
  const [supplies, setSupplies] = useState<IRecipeSupplyDisplay[]>([]);
  const { getRecipe } = useProduct();
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  useEffect(() => {
    showLoading();
    getRecipe(product.productId)
      .then((response) => {
        setRecipes(response[1]);
        setSupplies(response[0]);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-950 text-white max-w-fit">
        <DialogHeader>
          <DialogTitle>
            Recipe: {product.productName} - {product.productId}
          </DialogTitle>
          <DialogDescription>
            Here is a list of recipe for this product and its supply
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <Tabs defaultValue="recipe">
          <TabsList className="w-full bg-zinc-700">
            <TabsTrigger
              value="recipe"
              className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Recipes
            </TabsTrigger>
            <TabsTrigger
              value="supply"
              className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Send Supply
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recipe">
            <DataTable columns={recipeColumns} data={recipes} />
          </TabsContent>
          <TabsContent value="supply">
            <DataTable columns={supplyColumns} data={supplies} />
          </TabsContent>
        </Tabs>
        <Separator className="bg-white" />
        <DialogFooter>
          <DialogClose>
            <StyledButton text="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
