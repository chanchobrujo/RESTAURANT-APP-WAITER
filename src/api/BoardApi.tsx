import {SERVICE_RESOURCES} from '../../environment/environment.prod';
import {builderApi} from './utilsApi';

export const apis = () => {
  const retriveBoard = builderApi(SERVICE_RESOURCES, '/retrieve/board');
  return {retriveBoard};
};
