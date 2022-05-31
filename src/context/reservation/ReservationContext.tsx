import React, { createContext, useReducer, useState } from "react";

import { apis } from "../../api/ReservationApi";
import { reservationReducer, ReservationState } from "./ReservationReducer";
import { ReservationByUserRequest } from "../../model/request/ReservationByUserRequest";

/**

 */

type ReservationContextProps = {
  success: boolean;
  message: string;
  loading: boolean;
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
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  const addReservation = async ({ dni, name }: ReservationByUserRequest) => {
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <ReservationContext.Provider value={{ ...state, addReservation, loading }}>
      {children}
    </ReservationContext.Provider>
  );
};
