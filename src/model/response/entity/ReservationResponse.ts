export interface ReservationResponse {
  id: string;
  board?: string;
  customer: string;
  dateCreated: string;
  details: Details;
}

export interface Details {
  state: string;
  user?: string;
}
