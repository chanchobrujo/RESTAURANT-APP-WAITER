export interface CartState {
  status: "checking" | "success" | "not-success";
  message: string;
  success: boolean;
}

type CartAction =
  | { type: "addError"; payload: string }
  | { type: "messageResponse"; payload: string }
  | { type: "removeError" };

export const CartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
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
