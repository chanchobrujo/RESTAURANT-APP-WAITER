import { ProductResponse } from "../entity/ItemResponse";
import { ResponseCollection } from "./ResponseCollection";

export interface ProductResponseCollection extends ResponseCollection {
  collections: ProductResponse[];
}
