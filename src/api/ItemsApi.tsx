import { SERVICE_ITEMS } from "../../environment/environment.prod";
import { builderApi } from "./utilsApi";

export const apis = () => {
  const itemsApi = builderApi(SERVICE_ITEMS, "/products");
  const categoriesApi = builderApi(SERVICE_ITEMS, "/categories");
  return { itemsApi, categoriesApi };
};
