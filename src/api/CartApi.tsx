import {SERVICE_CART} from '../../environment/environment.prod';
import {builderApi, builderAuthoriesByStorage} from './utilsApi';

export const apis = () => {
  const cart = builderApi(SERVICE_CART, '/cart');

  builderAuthoriesByStorage(cart);
  return {cart};
};
