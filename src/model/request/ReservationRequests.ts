export interface ReservationByUserRequest {
  name: string;
  dni: string;
}
export interface ReservationDeliveryByUserRequest {
  dni: string;
  unit_delivery: string;
}
