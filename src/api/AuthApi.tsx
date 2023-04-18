import {SERVICE_AUTH} from '../../environment/environment.prod';
import {builderApi, builderAuthoriesByStorage} from './utilsApi';

export const apisAuth = () => {
  const authApi = builderApi(SERVICE_AUTH, '/auth');
  const profileApi = builderApi(SERVICE_AUTH, '/my-personal-data');

  builderAuthoriesByStorage(authApi);
  builderAuthoriesByStorage(profileApi);

  const reload = async () => {
    builderAuthoriesByStorage(authApi);
    builderAuthoriesByStorage(profileApi);
  };

  return {authApi, profileApi, reload};
};
