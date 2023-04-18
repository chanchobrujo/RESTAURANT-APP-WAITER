export interface BoardResponse {
  id: number;
  name: string;
  image: string;
  env?: string;
  seating: number;
  details: Details;
}

export interface Details {
  state: string;
  join?: string;
  seatings?: string;
}
