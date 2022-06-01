import { SERVICE_MAINTENANCES } from "../../environment/environment.prod";
import { builderApi } from "./utilsApi";

export const apis = () => {
  const retriveBoard = builderApi(SERVICE_MAINTENANCES, "/retriveBoard");
  return { retriveBoard };
};
