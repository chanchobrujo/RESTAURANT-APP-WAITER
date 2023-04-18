import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useReducer, useState} from 'react';

import {_stompClient} from '../../App';
import {apisAuth} from '../../api/AuthApi';
import {authReducer, AuthState} from './AuthReducer';
import {SignInRequest} from '../../model/request/SignInRequest';
import {SignInResponse} from '../../model/response/SignInResponse';
import {UserResponse} from '../../model/response/entity/UserResponse';
import {VerifyTokenResponse} from '../../model/response/VerifyTokenResponse';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';

  loading: boolean;
  logOut: () => void;
  removeError: () => void;
  myPersonalData: UserResponse;
  signIn: (request: SignInRequest) => void;
};

const authInitialState: AuthState = {
  token: null,
  mydata: null,
  errorMessage: '',
  status: 'checking',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {authApi, profileApi, reload} = apisAuth();

  const [loading, setloading] = useState(false);
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const [myPersonalData, setMyPorsonalData] = useState<UserResponse>({
    id: '',
    dni: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    created: '',
    state: '',
    role: '',
    specialty: '',
  });

  useEffect(() => {
    verifyToken();
  }, []);

  const myProfileData = async () => {
    reload();
    const token: string = (await AsyncStorage.getItem('token')) || '';

    try {
      const response = await profileApi.get<UserResponse>('');
      setMyPorsonalData(response.data);

      dispatch({type: 'signUp', payload: {token, me: response.data}});
    } catch (error: any) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});
    try {
      const response = await authApi.post<VerifyTokenResponse>('/verify');
      await AsyncStorage.setItem('token', response.data.token);

      myProfileData();
    } catch (error: any) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const signIn = async ({username, password}: SignInRequest) => {
    try {
      setloading(true);
      const request: SignInRequest = {username, password};
      const response = await authApi.post<SignInResponse>('/ForWaiter', request);
      let token: string = response.data.token;
      AsyncStorage.setItem('token', token);

      myProfileData();
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.message});
    } finally {
      setloading(false);
    }
  };

  const logOut = async () => {
    setloading(true);
    await AsyncStorage.removeItem('token');
    _stompClient.deactivate();
    setloading(false);
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
        removeError,
        loading,
        myPersonalData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
