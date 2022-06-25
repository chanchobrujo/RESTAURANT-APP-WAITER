import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const builderApi = (service: string, value: string): AxiosInstance => {
  return axios.create({baseURL: service.concat(value)});
};

export const builderAuthories = (token: string, api: any): any => {
  api.interceptors.request.use(async (config: any) => {
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  });
};

export const builderAuthoriesByStorage = (api: any) => {
  AsyncStorage.getItem('token').then((token) => {
    builderAuthories(token || '', api);
  });
};
