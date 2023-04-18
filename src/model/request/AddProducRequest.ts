interface AddProduct {
  product: string;
  quantity: number;
}

export interface AddProducRequest extends AddProduct {
  board: string;
}

export interface AddProductInDelivery extends AddProduct {
  delivery: string;
}
