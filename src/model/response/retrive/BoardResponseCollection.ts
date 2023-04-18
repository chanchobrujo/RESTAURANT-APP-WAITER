import { BoardResponse } from "../entity/BoardResponse";
import { ResponseCollection } from "./ResponseCollection";

export interface BoardResponseCollection extends ResponseCollection {
  collections: BoardResponse[];
}
