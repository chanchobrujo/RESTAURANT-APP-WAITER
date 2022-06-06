import { builderApi } from "./utilsApi";
import { SERVICE_MAINTENANCES } from "../../environment/environment.prod";

export const apis = () => {
  //occupied
  const deliveryUnit = builderApi(SERVICE_MAINTENANCES, "/deliveryUnitRetrive");
  return { deliveryUnit };
};
