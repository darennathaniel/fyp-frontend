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
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { IConvertToSupplyDialog } from "@/types/dialog/IDialog";
import { IRecipeDisplay } from "@/types/product/IProduct";
import { DialogClose } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function RecipesDialog({
  children,
  product,
}: IConvertToSupplyDialog) {
  const [open, setOpen] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<IRecipeDisplay[]>([]);
  const { getRecipe } = useProduct();
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  useEffect(() => {
    showLoading();
    getRecipe(product.productId)
      .then((response) => setRecipes(response))
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
        <DataTable columns={columns} data={recipes} />
        <Separator className="bg-white my-4" />
        <DialogFooter>
          <DialogClose>
            <StyledButton text="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
