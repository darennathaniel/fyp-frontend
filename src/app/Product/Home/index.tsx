import { DataTable } from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
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
import { Link } from "react-router-dom";
import { columns } from "./columns";
import AddProductWithoutRecipeDialog from "./components/AddProductWithoutRecipeDialog";
import AddProductWithRecipeDialog from "./components/AddProductWithRecipeDialog";
import ConvertPrerequisiteToSupplyDialog from "./components/ConvertPrerequisiteToSupplyDialog";
import ConvertToSupplyDialog from "./components/ConvertToSupplyDialog";
import RecipesDialog from "./components/RecipesDialog";

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
      <div>
        <PageHeader
          title="List of All Products"
          description="Below is a table that lists down all products that has been created."
        />
        <div className="w-full flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="w-3/4">
            <DataTable data={allProducts} columns={columns} />
          </div>
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
        {user.isAuthenticated && user.isOwner ? (
          <AddProductWithoutRecipeDialog
            allData={allProducts}
            setAllData={setAllProducts}
          >
            <StyledButton className="w-content">
              Add Product W/O Recipe
            </StyledButton>
          </AddProductWithoutRecipeDialog>
        ) : (
          <Button className="w-44 cursor-default hidden md:block"></Button>
        )}
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
        <AddProductWithRecipeDialog
          data={products}
          setData={setProducts}
          allData={allProducts}
          setAllData={setAllProducts}
        >
          <StyledButton className="w-content">
            Add Product With Recipe
          </StyledButton>
        </AddProductWithRecipeDialog>
      </div>
      <TabsContent
        value="my_product"
        className="w-full flex justify-center flex-col items-center"
      >
        <div className="w-3/4">
          <PageHeader
            title="List of My Products"
            description="Below is a table that lists down all of your products that you have created."
          />
        </div>
        {products.length > 0 ? (
          <div className={`w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {products.map((product) => (
              <Card className="w-full bg-zinc-950 text-white">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex justify-between items-center">
                    <div>{product.productName}</div>
                    <Link to={product.productId.toString()}>
                      <StyledButton>More info</StyledButton>
                    </Link>
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
                <CardFooter className="grid gap-2 grid-cols-2">
                  {product.has_recipe ? (
                    <>
                      <RecipesDialog product={product}>
                        <StyledButton>Recipe List</StyledButton>
                      </RecipesDialog>
                      <ConvertPrerequisiteToSupplyDialog
                        product={product}
                        data={products}
                        setData={setProducts}
                      >
                        <StyledButton>Convert Prerequisite</StyledButton>
                      </ConvertPrerequisiteToSupplyDialog>
                    </>
                  ) : (
                    <ConvertToSupplyDialog
                      product={product}
                      data={products}
                      setData={setProducts}
                    >
                      <StyledButton className="col-span-2">
                        Convert to Supply
                      </StyledButton>
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
        <div className="w-full flex items-center justify-center flex-col h-[calc(100vh-20rem)]">
          <div className="w-3/4">
            <PageHeader
              title="List of All Products"
              description="Below is a table that lists down all products that has been created."
            />
          </div>
          <div className="w-3/4">
            <DataTable data={allProducts} columns={columns} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
