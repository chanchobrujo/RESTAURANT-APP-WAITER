import { ResponseCollection } from "./ResponseCollection";
import { ReservationResponse } from "../entity/ReservationResponse";

export interface ReservationResponseCollection extends ResponseCollection {
  collections: ReservationResponse[];
}
