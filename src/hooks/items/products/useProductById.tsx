import { useEffect, useState } from "react";

import { apis } from "../../../api/ItemsApi";
import { ProductResponse } from "../../../model/response/entity/ItemResponse";

export const useItemsById = (cod: string) => {
  const { itemsApi } = apis();
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<ProductResponse>({} as ProductResponse);

  const findById = async () => {
    let endpoint: string = `/findById?id=${cod}`;
    const response = await itemsApi.get<ProductResponse>(endpoint);
    setItem(response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    findById();
  }, []);

  return { isLoading, item };
};
