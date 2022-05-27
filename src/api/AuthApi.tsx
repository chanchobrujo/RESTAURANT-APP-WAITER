import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVICE_MAINTENANCES } from "../../environment/environment.prod";

const authApi = axios.create({ baseURL: SERVICE_MAINTENANCES.concat("/auth") });

authApi.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
export default authApi;
