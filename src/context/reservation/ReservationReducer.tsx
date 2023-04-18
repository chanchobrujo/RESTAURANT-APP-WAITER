export interface ReservationState {
  status: "checking" | "success" | "not-success";
  message: string;
  success: boolean;
}

type ReservationAction =
  | { type: "addError"; payload: string }
  | { type: "messageResponse"; payload: string }
  | { type: "removeError" };

export const reservationReducer = (
  state: ReservationState,
  action: ReservationAction
): ReservationState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        status: "not-success",
        success: false,
        message: action.payload,
      };

    case "messageResponse":
      return {
        ...state,
        success: true,
        message: action.payload,
      };

    case "removeError":
      return {
        ...state,
        success: true,
        message: "",
      };
  }
};
