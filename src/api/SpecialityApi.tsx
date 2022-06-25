import {builderApi} from './utilsApi';
import {SERVICE_CALL} from '../../environment/environment.prod';

export const specialityApis = () => {
  const specialityApi = builderApi(SERVICE_CALL, '/specialty/retrieve');
  return {specialityApi};
};
