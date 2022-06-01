import { SERVICE_ORDER } from "../../environment/environment.prod";
import { builderApi, builderAuthoriesByStorage } from "./utilsApi";

export const apis = () => {
  const reservation = builderApi(SERVICE_ORDER, "/reservation");

  builderAuthoriesByStorage(reservation);
  return { reservation };
};
