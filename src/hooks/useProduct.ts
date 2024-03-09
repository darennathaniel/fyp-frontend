import { IRecipe } from "@/types/product/IProduct";
import { axiosPrivate } from "@/utils/axios";

export function useProduct() {
  const getProductByCompany = async (companyAddress: string) => {
    const response = await axiosPrivate.get("product", {
      params: {
        company_address: companyAddress,
      },
    });
    const data = response.data.data[0];
    return data;
  };
  const getPrerequisiteByCompany = async (companyAddress: string) => {
    const response = await axiosPrivate.get("product/prerequisite", {
      params: {
        company_address: companyAddress,
      },
    });
    const data = response.data.data[0];
    return data;
  };
  const getMyProduct = async () => {
    const response = await axiosPrivate.get("product/my");
    return response.data.data[0];
  };
  const getMyPrerequisiteProduct = async () => {
    const response = await axiosPrivate.get("product/prerequisite/my");
    return response.data.data[0];
  };
  const getAllProducts = async () => {
    const response = await axiosPrivate.get("product");
    return response.data.data[0];
  };
  const getAllProductsHaveRecipe = async (company_address?: string) => {
    const response = await axiosPrivate.get("product", {
      params: {
        has_recipe: true,
        company_address,
        filter: company_address !== undefined ? true : false,
      },
    });
    return response.data.data[0];
  };
  const getAllProductsNoRecipe = async (company_address?: string) => {
    const response = await axiosPrivate.get("product", {
      params: {
        has_recipe: false,
        company_address,
        filter: company_address !== undefined ? true : false,
      },
    });
    return response.data.data[0];
  };
  const addProductWithRecipe = async (
    productName: string,
    recipes: IRecipe[]
  ) => {
    const prerequisiteSupplies = recipes.map((recipe) => {
      return {
        product_id: recipe.productId,
        product_name: recipe.productName,
      };
    });
    const quantityPrerequisiteSupplies = recipes.map(
      (recipe) => recipe.quantity
    );
    const response = await axiosPrivate.post("product", {
      product_name: productName,
      prerequisite_supplies: prerequisiteSupplies,
      quantity_prerequisite_supplies: quantityPrerequisiteSupplies,
    });
    return response;
  };
  const addProductOwnerWithoutRecipe = async (product: string) => {
    const splitProduct = product.split("-");
    const response = await axiosPrivate.post(
      "product/no_recipe",
      {
        product_id: splitProduct[0],
        product_name: splitProduct[1],
      },
      {
        params: {
          existing: true,
        },
      }
    );
    return response;
  };
  const addProductOwnerWithRecipe = async (
    product: string,
    recipes: IRecipe[]
  ) => {
    const splitProduct = product.split("-");
    const prerequisiteSupplies = recipes.map((recipe) => {
      return {
        product_id: recipe.productId,
        product_name: recipe.productName,
      };
    });
    const quantityPrerequisiteSupplies = recipes.map(
      (recipe) => recipe.quantity
    );
    const response = await axiosPrivate.post(
      "product/",
      {
        product_id: splitProduct[0],
        product_name: splitProduct[1],
        prerequisite_supplies: prerequisiteSupplies,
        quantity_prerequisite_supplies: quantityPrerequisiteSupplies,
      },
      {
        params: {
          existing: true,
        },
      }
    );
    return response;
  };
  const addProductWithoutRecipe = async (productName: string) => {
    const response = await axiosPrivate.post("product/no_recipe", {
      product_name: productName,
    });
    return response;
  };
  const getRecipe = async (productId: number) => {
    const response = await axiosPrivate.get("product/recipe", {
      params: { product_id: productId },
    });
    return response.data.data;
  };
  const getProduct = async (productId: string | number) => {
    const response = await axiosPrivate.get("product", {
      params: { product_id: productId },
    });
    return response.data.data[0];
  };
  const deleteRequestProduct = async (productId: string | number) => {
    const response = await axiosPrivate.post("product/delete_request", {
      product_id: productId,
    });
    return response;
  };
  const getIncomingDeleteRequest = async () => {
    const response = await axiosPrivate.get("product/delete_request/incoming");
    return response.data.data[0];
  };
  const getOutgoingDeleteRequest = async () => {
    const response = await axiosPrivate.get("product/delete_request/outgoing");
    return response.data.data[0];
  };
  const getHistoryDeleteRequest = async () => {
    const incomingResponse = await axiosPrivate.get(
      "product/delete_request/incoming",
      {
        params: {
          timeline: "past",
        },
      }
    );
    const outgoingResponse = await axiosPrivate.get(
      "product/delete_request/outgoing",
      {
        params: {
          timeline: "past",
        },
      }
    );
    return [...incomingResponse.data.data[0], ...outgoingResponse.data.data[0]];
  };
  const deleteProduct = async (
    requestId: number,
    productId: number,
    code: string
  ) => {
    const response = await axiosPrivate.delete("product", {
      params: {
        request_id: requestId,
        product_id: productId,
        code,
      },
    });
    return response;
  };
  const approveDeleteProduct = async (
    requestId: number,
    productId: number,
    code: string,
    owner: string
  ) => {
    const response = await axiosPrivate.post("product/delete_request/approve", {
      request_id: requestId,
      product_id: productId,
      code,
      request_owner: owner,
    });
    return response;
  };
  const declineDeleteProduct = async (
    requestId: number,
    productId: number,
    code: string
  ) => {
    const response = await axiosPrivate.post("product/delete_request/decline", {
      request_id: requestId,
      product_id: productId,
      code,
    });
    return response;
  };
  return {
    getProductByCompany,
    getPrerequisiteByCompany,
    getMyProduct,
    getMyPrerequisiteProduct,
    getAllProducts,
    addProductWithRecipe,
    addProductWithoutRecipe,
    addProductOwnerWithRecipe,
    addProductOwnerWithoutRecipe,
    getRecipe,
    getProduct,
    getAllProductsHaveRecipe,
    getAllProductsNoRecipe,
    deleteRequestProduct,
    getIncomingDeleteRequest,
    getOutgoingDeleteRequest,
    getHistoryDeleteRequest,
    deleteProduct,
    approveDeleteProduct,
    declineDeleteProduct,
  };
}
