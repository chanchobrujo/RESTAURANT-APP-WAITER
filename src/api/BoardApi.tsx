import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVICE_MAINTENANCES } from "../../environment/environment.prod";

export const apis = () => {
  const builderApi = (value: string) =>
    axios.create({
      baseURL: SERVICE_MAINTENANCES.concat(value),
    });

  const retriveBoard = builderApi("/retriveBoard");
  return { retriveBoard };
};
