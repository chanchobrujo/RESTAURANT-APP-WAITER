import {SERVICE_RESOURCES} from '../../environment/environment.prod';
import {builderApi} from './utilsApi';

export const apis = () => {
  const itemsApi = builderApi(SERVICE_RESOURCES, '/products');
  const categoriesApi = builderApi(SERVICE_RESOURCES, '/categories');
  return {itemsApi, categoriesApi};
};
