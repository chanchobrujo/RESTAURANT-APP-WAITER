export interface UnitDelivery {
  id: number;
  typeVehicule: string;
  licensePlate: string;
  details: Details;
}

export interface Details {
  state: string;
  number?: string;
  person?: string;
  external: string;
}
