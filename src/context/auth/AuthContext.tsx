import SockJS from 'sockjs-client';
import {IMessage} from '@stomp/stompjs';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useReducer, useState} from 'react';

import {apis} from '../../api/AuthApi';
import {url, _stompClient} from '../../App';
import {authReducer, AuthState} from './AuthReducer';
import {Notify} from '../../model/response/NotifyCookResponse';
import {SignInRequest} from '../../model/request/SignInRequest';
import {SignInResponse} from '../../model/response/SignInResponse';
import {UserResponse} from '../../model/response/entity/UserResponse';
import {NotifyCookRequest} from '../../model/request/NotifyCookRequest';
import {VerifyTokenResponse} from '../../model/response/VerifyTokenResponse';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';

  publishMessage: (request: NotifyCookRequest) => void;
  myProfileData: () => void;
  signIn: (request: SignInRequest) => void;
  logOut: () => void;
  removeError: () => void;
  myPersonalData: UserResponse;
  loading: boolean;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  mydata: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {authApi, profileApi} = apis();
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
  const [loading, setloading] = useState(false);
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    verifyToken();
    myProfileData();
  }, []);

  const sendNotify = (body: string) => {
    const notify: Notify = JSON.parse(body) as Notify;

    let bodyValue: string =
      'Plato: ' + notify.food + ', ' + notify.quantity + ', ' + notify.time;

    async function onDisplayNotification() {
      const channelId = await notifee.createChannel({
        id: notify.id + '',
        name: 'Default Channel',
      });
      await notifee.displayNotification({
        title: 'Mesa: ' + notify.board,
        body: bodyValue,
        android: {channelId},
      });
    }
    onDisplayNotification();
  };

  _stompClient.activate();
  _stompClient.configure({
    brokerURL: url,
    reconnectDelay: 500,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: false,
    webSocketFactory: () => SockJS(url),

    onConnect: async () => {
      const response = await profileApi.get<UserResponse>('');
      const endpoint: string = '/notify/deliver/' + response.data.specialty;
      _stompClient.subscribe(endpoint, (e: IMessage) => sendNotify(e.body));
    },
  });

  const publishMessage = async (message: NotifyCookRequest) => {
    const response = await profileApi.get<UserResponse>('');
    const endpoint: string = '/app/food/' + response.data.specialty;

    _stompClient.publish({
      destination: endpoint,
      body: JSON.stringify(message),
    });
  };

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});
    try {
      const response = await authApi.post<VerifyTokenResponse>('/verify');
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signUp', payload: {token: response.data.token}});
    } catch (error: any) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const myProfileData = async () => {
    try {
      const response = await profileApi.get<UserResponse>('');
      setMyPorsonalData(response.data);
      dispatch({type: 'myData', payload: {mydata: response.data}});
    } catch (error: any) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const signIn = async ({username, password}: SignInRequest) => {
    try {
      setloading(true);
      const response = await authApi.post<SignInResponse>('/ForWaiter', {
        username,
        password,
      });
      let token: string = response.data.token;

      dispatch({type: 'signUp', payload: {token: token}});
      await AsyncStorage.setItem('token', token);
      setloading(false);
    } catch (error: any) {
      const message = error.response.data.message;

      dispatch({type: 'addError', payload: message});
      setloading(false);
    }
  };

  const logOut = async () => {
    setloading(true);
    await AsyncStorage.removeItem('token');
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
        myProfileData,
        signIn,
        logOut,
        removeError,
        publishMessage,
        loading,
        myPersonalData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
