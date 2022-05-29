import axios from "axios";

import { SERVICE_ITEMS } from "../../environment/environment.prod";

export const apis = () => {
  const builderApi = (value: string) =>
    axios.create({
      baseURL: SERVICE_ITEMS.concat(value),
    });

  const itemsApi = builderApi("/products");
  const categoriesApi = builderApi("/categories");
  return { itemsApi, categoriesApi };
};
