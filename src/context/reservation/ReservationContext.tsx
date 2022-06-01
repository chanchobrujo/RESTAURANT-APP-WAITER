import React, { createContext, useEffect, useReducer, useState } from "react";

import { apis } from "../../api/ReservationApi";
import { reservationReducer, ReservationState } from "./ReservationReducer";
import { ReservationResponse } from "../../model/response/entity/ReservationResponse";
import { ReservationByUserRequest } from "../../model/request/ReservationByUserRequest";
import { ReservationResponseCollection } from "../../model/response/retrive/ReservationResponseCollection";

type ReservationContextProps = {
  success: boolean;
  message: string;
  loading: boolean;
  loadingSave: boolean;
  collection: ReservationResponse[];
  findAll: () => void;
  addReservation: ({ dni, name }: ReservationByUserRequest) => void;
};

const initialState: ReservationState = {
  status: "checking",
  success: true,
  message: "",
};

export const ReservationContext = createContext({} as ReservationContextProps);

export const ReservationProvider = ({ children }: any) => {
  const { reservation } = apis();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  const [collection, setCollection] = useState<ReservationResponse[]>([]);

  const getUri = () => `?size=4&page=${index}`;

  const addReservation = async ({ dni, name }: ReservationByUserRequest) => {
    setLoadingSave(true);

    try {
      const response = await reservation.post("/reserveByUser", {
        name: name,
        dni: dni,
      });

      dispatch({ type: "messageResponse", payload: response.data.message });
    } catch (error: any) {
      dispatch({ type: "addError", payload: error.response.data.message });
    } finally {
      dispatch({ type: "removeError" });
      setLoadingSave(false);
    }
  };

  const findAll = async () => {
    setLoading(true);

    try {
      const res = await reservation.get<ReservationResponseCollection>(
        getUri()
      );
      if (res.data.totalPages > index) {
        setCollection([...collection, ...res.data.collections]);
        setIndex(index + 1);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findAll();
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        ...state,
        loading,
        collection,
        loadingSave,
        findAll,
        addReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
