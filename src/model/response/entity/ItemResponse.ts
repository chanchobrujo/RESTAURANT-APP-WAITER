export interface ProductResponse {
  cod: string;
  names: string[];
  description: string[];
  images: string[];
  descount?: number;
  metric: string;
  price: number;
  stock: number;
  category: string;
}
