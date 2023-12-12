import { DataTable } from "@/components/DataTable";
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
import { useLoading } from "@/hooks/useLoading";
import { useProduct } from "@/hooks/useProduct";
import { IProduct } from "@/types/product/IProduct";
import { ISupply } from "@/types/supply/ISupply";
import { useEffect, useState } from "react";
import ConvertToSupplyDialog from "./components/ConvertToSupplyDialog";

export default function ProductHome() {
  const user = useAppSelector((state) => state.app.user);
  const { getMyProduct } = useProduct();
  const [products, setProducts] = useState<(IProduct & ISupply)[]>([]);
  const { showLoading, closeLoading } = useLoading();
  useEffect(() => {
    showLoading();
    getMyProduct()
      .then((response) => setProducts(response))
      .finally(() => closeLoading());
  }, []);
  if (!user.isAuthenticated) return <div>test</div>;
  return (
    <Tabs
      className="w-full items-center flex flex-col space-y-6 p-3"
      defaultValue="my_product"
    >
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
      <TabsContent value="my_product" className="w-full flex justify-center">
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </TabsContent>
      <TabsContent value="all_product" className="w-full flex justify-center">
        <div className="w-3/4">
          {/* <DataTable
                data={data}
                columns={columns}
                totalPages={pageCount}
                pathname="/product"
              /> */}
        </div>
      </TabsContent>
    </Tabs>
  );
}
