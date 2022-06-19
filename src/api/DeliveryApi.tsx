import {builderApi} from './utilsApi';
import {SERVICE_CALL} from '../../environment/environment.prod';

export const apis = () => {
  //occupied
  const deliveryUnit = builderApi(SERVICE_CALL, '/deliveryUnitRetrive');
  return {deliveryUnit};
};
