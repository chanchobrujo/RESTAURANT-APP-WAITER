import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVICE_ORDER } from "../../environment/environment.prod";

export const apis = () => {
  const builderApi = (value: string) =>
    axios.create({
      baseURL: SERVICE_ORDER.concat(value),
    });

  const reservation = builderApi("/reservation");

  const builderAuthories = (token: string, api: any): any => {
    api.interceptors.request.use(async (config: any) => {
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  };

  const builderAuthoriesByStorage = (api: any) => {
    AsyncStorage.getItem("token").then((token) =>
      builderAuthories(token || "", api)
    );
  };

  builderAuthoriesByStorage(reservation);
  return { reservation };
};
