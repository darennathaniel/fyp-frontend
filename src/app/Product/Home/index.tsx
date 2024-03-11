import ConfirmationButton from "@/components/ConfirmationButton";
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
import { useSuccess } from "@/hooks/useSuccess";
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
import SendSupplyRequestDialog from "./components/SendSupplyRequestDialog";

export default function ProductHome() {
  const user = useAppSelector((state) => state.app.user);
  const {
    getMyProduct,
    getAllProducts,
    getMyPrerequisiteProduct,
    deleteRequestProduct,
  } = useProduct();
  const [products, setProducts] = useState<
    (IProduct & ISupply & { delete_request?: boolean })[]
  >([]);
  const [prerequisiteProducts, setPrerequisiteProducts] = useState<
    (IProduct & ISupply & { owner: string })[]
  >([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const { showLoading, closeLoading } = useLoading();
  const { showSuccess } = useSuccess();
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
    showLoading();
    getMyPrerequisiteProduct()
      .then((response) => {
        setPrerequisiteProducts(response);
      })
      .finally(() => closeLoading());
  }, []);
  if (!user.isAuthenticated) {
    return (
      <div>
        <div className="w-full flex items-center justify-center h-[calc(100vh-8rem)] flex-col">
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
      </div>
    );
  }
  return (
    <Tabs
      className="w-full items-center flex flex-col space-y-6 p-3"
      defaultValue="my_product"
    >
      <div className="w-3/4 flex items-center justify-between">
        {user.isAuthenticated ? (
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
        <TabsList className="w-1/2 bg-zinc-700">
          <TabsTrigger
            value="my_product"
            className="rounded-lg text-gray-400 hover:text-white w-1/3 h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            My Product
          </TabsTrigger>
          <TabsTrigger
            value="my_prereq_product"
            className="w-1/3 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            My Prerequisite
          </TabsTrigger>
          <TabsTrigger
            value="all_product"
            className="w-1/3 rounded-lg text-gray-400 hover:text-white h-full data-[state=active]:bg-zinc-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
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
                    <div className="space-x-2">
                      {!product.delete_request ? (
                        <ConfirmationButton
                          onConfirmClick={() => {
                            showLoading();
                            deleteRequestProduct(product.productId)
                              .then((response) => {
                                showSuccess(response);
                                const newProducts = products.map(
                                  (oldProduct) => {
                                    if (
                                      oldProduct.productId === product.productId
                                    )
                                      return {
                                        ...oldProduct,
                                        delete_request: true,
                                      };
                                    return oldProduct;
                                  }
                                );
                                setProducts(newProducts);
                              })
                              .catch((err) => {
                                if (err instanceof AxiosError) showError(err);
                              })
                              .finally(() => closeLoading());
                          }}
                          onCancelClick={() => {}}
                        >
                          <StyledButton className="text-red-600 hover:text-red-600 border-red-600">
                            Delete Request
                          </StyledButton>
                        </ConfirmationButton>
                      ) : (
                        <></>
                      )}
                      <Link to={product.productId.toString()}>
                        <StyledButton>More info</StyledButton>
                      </Link>
                    </div>
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
                  {!product.delete_request ? (
                    product.has_recipe ? (
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
                    )
                  ) : (
                    <div className="text-zinc-400">
                      Delete Request is on the way...
                    </div>
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
      <TabsContent
        value="my_prereq_product"
        className="w-full flex justify-center flex-col items-center"
      >
        <div className="w-3/4">
          <PageHeader
            title="List of My Prerequisite Products"
            description="Below is a table that lists down all of the products that you have partnered with."
          />
        </div>
        {prerequisiteProducts.length > 0 ? (
          <div className={`w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {prerequisiteProducts.map((product) => (
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
                    <div className="font-semibold">Product Owner</div>
                    <div className="text-zinc-400 text-ellipsis text-sm overflow-hidden">
                      {product.owner ?? "N.A."}
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
                  {product.owner ? (
                    <SendSupplyRequestDialog
                      product={product}
                      owner={product.owner.split(" - ")[1]}
                      company_name={product.owner.split(" - ")[0]}
                    >
                      <StyledButton className="col-span-2">
                        Send Supply Request
                      </StyledButton>
                    </SendSupplyRequestDialog>
                  ) : (
                    <div className="text-zinc-400 text-sm col-span-2">
                      Send Supply Feature is disabled. Supply Owner has deleted
                      ownership of product.
                    </div>
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
