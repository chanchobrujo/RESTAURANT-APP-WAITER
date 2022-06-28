import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const builderApi = (service: string, value: string): AxiosInstance => {
  return axios.create({baseURL: service.concat(value)});
};

export const builderAuthories = (token: string, api: AxiosInstance): any => {
  api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (token) config.headers = {Authorization: `Bearer ${token}`};
    return config;
  });
};

export const builderAuthoriesByStorage = async (api: AxiosInstance) => {
  const token: string = (await AsyncStorage.getItem('token')) || '';
  builderAuthories(token, api);
};
