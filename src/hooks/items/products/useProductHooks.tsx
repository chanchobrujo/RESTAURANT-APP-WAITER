import {useState} from 'react';

import {apis} from '../../../api/ItemsApi';
import {ProductResponse} from '../../../model/response/entity/ItemResponse';
import {ProductResponseCollection} from '../../../model/response/retrive/ItemResponseCollection';

export const useItemPaginated = () => {
  const {itemsApi} = apis();

  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<ProductResponse[]>([]);

  const getUri = () => `/findByParams?size=4&page=${index}&category=&speciality=`;

  const findAll = async (value: number) => {
    setLoading(true);
    try {
      let destination: string = getUri() + value;
      let res = await itemsApi.get<ProductResponseCollection>(destination);
      if (res.data.totalPages > index) {
        setCollection([...collection, ...res.data.collections]);
        setIndex(index + 1);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {loading, collection, findAll};
};
