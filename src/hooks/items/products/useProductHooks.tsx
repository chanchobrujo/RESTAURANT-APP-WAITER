import { useEffect, useState } from "react";

import { apis } from "../../../api/ItemsApi";
import { ProductResponse } from "../../../model/response/entity/ItemResponse";
import { ProductResponseCollection } from "../../../model/response/retrive/ItemResponseCollection";

export const useItemPaginated = () => {
  const { itemsApi } = apis();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<ProductResponse[]>([]);

  const getUri = () => `?size=4&page=${index}`;

  const findAll = async () => {
    try {
      setLoading(true);
      let res = await itemsApi.get<ProductResponseCollection>(getUri());
      if (res.data.totalPages > index) {
        setCollection([...collection, ...res.data.collections]);
        setIndex(index + 1);
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    findAll();
  }, []);

  return { loading, collection, findAll };
};
