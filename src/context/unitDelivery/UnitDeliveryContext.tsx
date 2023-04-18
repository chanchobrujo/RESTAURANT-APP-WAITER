import React, { createContext, useEffect, useState } from "react";

import { apis } from "../../api/DeliveryApi";
import { UnitDelivery } from "../../model/response/entity/UnitDelivery";

type UnitDeliveryContextProps = {
  loading: boolean;
  collection: UnitDelivery[];
  retriveUnitDelivery: () => Promise<void>;
  retriveOccupiedUnitDelivery: () => Promise<void>;
};

export const UnitDeliveryContext = createContext(
  {} as UnitDeliveryContextProps
);

export const UnitDeliveryProvider = ({ children }: any) => {
  const { deliveryUnit } = apis();
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<UnitDelivery[]>([]);

  const retriveOccupiedUnitDelivery = async () => {
    setLoading(true);
    try {
      const response = await deliveryUnit.get<UnitDelivery[]>("/occupied");
      setCollection(response.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const retriveUnitDelivery = async () => {
    setLoading(true);
    try {
      const response = await deliveryUnit.get<UnitDelivery[]>("");
      setCollection(response.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnitDeliveryContext.Provider
      value={{
        retriveUnitDelivery,
        retriveOccupiedUnitDelivery,
        collection,
        loading,
      }}
    >
      {children}
    </UnitDeliveryContext.Provider>
  );
};
