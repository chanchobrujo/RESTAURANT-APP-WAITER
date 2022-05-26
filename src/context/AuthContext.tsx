import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SignInRequest } from "../model/request/SignInRequest";
import { SignInResponse } from "../model/response/SignInResponse";
import authApi from "../services/AuthService";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: "checking" | "authenticated" | "not-authenticated";

  signUp: () => void;
  signIn: (request: SignInRequest) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: "checking",
  token: null,
  errorMessage: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return dispatch({ type: "notAuthenticated" });
    //validar token
    dispatch({ type: "signUp", payload: { token: token } });
  };

  const signUp = async () => {};
  const signIn = async ({ username, password }: SignInRequest) => {
    try {
      const response = await authApi.post<SignInResponse>("/singIn", {
        username,
        password,
      });
      let token: string = response.data.token;

      dispatch({ type: "signUp", payload: { token: token } });
      await AsyncStorage.setItem("token", token);
    } catch (error: any) {
      const message = error.response.data.message;
      console.log(message);

      dispatch({ type: "addError", payload: message });
    }
  };
  const logOut = () => {};
  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signUp, signIn, logOut, removeError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
