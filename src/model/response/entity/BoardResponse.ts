export interface BoardResponse {
  id: number;
  name: string;
  image: string;
  environment?: string;
  seating: number;
  details: Details;
}

export interface Details {
  state: string;
  join?: string;
  seatings?: string;
}
