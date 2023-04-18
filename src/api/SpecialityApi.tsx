import {builderApi} from './utilsApi';
import {SERVICE_RESOURCES} from '../../environment/environment.prod';

export const specialityApis = () => {
  const specialityApi = builderApi(SERVICE_RESOURCES, '/retrieve/speciality/');
  return {specialityApi};
};
