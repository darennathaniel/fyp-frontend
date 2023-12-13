import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { IProduct } from "@/types/product/IProduct";
import { ISupply } from "@/types/supply/ISupply";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import AddProductDialog from "./components/AddProductDialog";
import ConvertToSupplyDialog from "./components/ConvertToSupplyDialog";

export default function ProductHome() {
  const user = useAppSelector((state) => state.app.user);
  const { getMyProduct, getAllProducts } = useProduct();
  const [products, setProducts] = useState<(IProduct & ISupply)[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  useEffect(() => {
    showLoading();
    getAllProducts()
      .then((response) => setAllProducts(response))
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
    showLoading();
    getMyProduct()
      .then((response) => setProducts(response))
      .finally(() => closeLoading());
  }, []);
  if (!user.isAuthenticated) {
    return (
      <div className="w-full flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-3/4">
          <DataTable data={allProducts} columns={columns} />
        </div>
      </div>
    );
  }
  return (
    <Tabs
      className="w-full items-center flex flex-col space-y-6 p-3"
      defaultValue="my_product"
    >
      <div className="w-3/4 flex items-center justify-between">
        <Button className="w-28 cursor-default hidden md:block"></Button>
        <TabsList className="w-1/4 bg-zinc-700">
          <TabsTrigger
            value="my_product"
            className="rounded-lg text-gray-400 hover:text-white w-1/2 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            My Product
          </TabsTrigger>
          <TabsTrigger
            value="all_product"
            className="w-1/2 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            All Product
          </TabsTrigger>
        </TabsList>
        <AddProductDialog
          data={products}
          setData={setProducts}
          allData={allProducts}
          setAllData={setAllProducts}
        >
          <StyledButton className="w-28">Add Product</StyledButton>
        </AddProductDialog>
      </div>
      <TabsContent value="my_product" className="w-full flex justify-center">
        {products.length > 0 ? (
          <div className={`w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {products.map((product) => (
              <Card className="w-full bg-zinc-950 text-white">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">
                    {product.productName}
                  </CardTitle>
                  <Separator className="bg-white" />
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex flex-col">
                    <div className="font-semibold">Product ID</div>
                    <div className="text-zinc-400 text-ellipsis text-sm overflow-hidden">
                      {product.productId}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold">Quantities</div>
                    <div className="text-zinc-400 text-ellipsis text-sm overflow-hidden">
                      {product.total}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="grid gap-2">
                  {product.has_recipe ? (
                    <StyledButton>Convert Prerequisite to Supply</StyledButton>
                  ) : (
                    <ConvertToSupplyDialog
                      product={product}
                      data={products}
                      setData={setProducts}
                    >
                      <StyledButton>Convert to Supply</StyledButton>
                    </ConvertToSupplyDialog>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            No products available.
            <br />
          </div>
        )}
      </TabsContent>
      <TabsContent value="all_product" className="w-full flex justify-center">
        <div className="w-full flex items-center justify-center h-[calc(100vh-20rem)]">
          <div className="w-3/4">
            <DataTable data={allProducts} columns={columns} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
