import {useEffect, useState} from 'react';

import {apis} from '../../../api/ItemsApi';
import {CategoryResponseCollection} from '../../../model/response/retrive/CategoryResponseCollection';

export const useCategoryFindAll = () => {
  const {categoriesApi} = apis();
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [collectionCategories, setCollection] = useState<string[]>([]);

  useEffect(() => {
    findAllCategories();
  }, []);

  const findAllCategories = async () => {
    let res = await categoriesApi.get<CategoryResponseCollection>('/');
    setCollection(res.data.collections);
    setLoadingCategories(false);
  };

  return {loadingCategories, collectionCategories, findAllCategories};
};
