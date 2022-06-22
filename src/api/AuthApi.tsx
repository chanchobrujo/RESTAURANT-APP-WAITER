import {SERVICE_CALL} from '../../environment/environment.prod';
import {builderApi, builderAuthoriesByStorage} from './utilsApi';

export const apis = () => {
  const authApi = builderApi(SERVICE_CALL, '/auth');
  const profileApi = builderApi(SERVICE_CALL, '/my-personal-data');

  builderAuthoriesByStorage(authApi);
  builderAuthoriesByStorage(profileApi);
  return {authApi, profileApi};
};
