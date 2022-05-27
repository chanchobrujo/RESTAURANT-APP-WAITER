import { ResponseCollection } from './ResponseCollection';

export interface CategoryResponseCollection extends ResponseCollection {
  collections?: string[];
}
