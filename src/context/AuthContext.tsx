import React, { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SignInRequest } from "../model/request/SignInRequest";
import { SignInResponse } from "../model/response/SignInResponse";
import authApi from "../api/AuthApi";
import { authReducer, AuthState } from "./AuthReducer";
import { VerifyTokenResponse } from "../model/response/VerifyTokenResponse";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: "checking" | "authenticated" | "not-authenticated";

  signUp: () => void;
  signIn: (request: SignInRequest) => void;
  logOut: () => void;
  removeError: () => void;

  loading: boolean;
};

const authInitialState: AuthState = {
  status: "checking",
  token: null,
  errorMessage: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [loading, setloading] = useState(false);
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return dispatch({ type: "notAuthenticated" });
    try {
      const response = await authApi.post<VerifyTokenResponse>("/verify");
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signUp", payload: { token: response.data.token } });
    } catch (error: any) {
      return dispatch({ type: "notAuthenticated" });
    }
  };

  const signUp = async () => {};
  const signIn = async ({ username, password }: SignInRequest) => {
    try {
      setloading(true);
      const response = await authApi.post<SignInResponse>("/singIn", {
        username,
        password,
      });
      let token: string = response.data.token;

      dispatch({ type: "signUp", payload: { token: token } });
      await AsyncStorage.setItem("token", token);
      setloading(false);
    } catch (error: any) {
      const message = error.response.data.message;

      dispatch({ type: "addError", payload: message });
      setloading(false);
    }
  };
  const logOut = async () => {
    setloading(true);
    await AsyncStorage.removeItem("token");
    setloading(false);
    dispatch({ type: "logout" });
  };
  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signUp, signIn, logOut, removeError, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
