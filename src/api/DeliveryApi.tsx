import {builderApi} from './utilsApi';
import {SERVICE_RESOURCES} from '../../environment/environment.prod';

export const apis = () => {
  const deliveryUnit = builderApi(SERVICE_RESOURCES, '/retrieve/unit-delivery/');
  return {deliveryUnit};
};
