import { ProductResponse } from "./ItemResponse";

export interface CartResponse {
  idCart: string;
  idLineRes: string;
  total: number;
  customer?: string;
  dateCreated: string;
  collection: LineCart[];
}

export interface LineCart {
  idCart: string;
  idLineCart: string;
  quantity: number;
  importt: number;
  product: ProductResponse;
}
