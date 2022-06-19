import {SERVICE_CALL} from '../../environment/environment.prod';
import {builderApi} from './utilsApi';

export const apis = () => {
  const retriveBoard = builderApi(SERVICE_CALL, '/retriveBoard');
  return {retriveBoard};
};
