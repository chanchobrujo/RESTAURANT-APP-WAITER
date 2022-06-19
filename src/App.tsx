import SockJS from 'sockjs-client';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Appearance} from 'react-native';
import Toast from 'react-native-toast-message';
import TextEncodingPolyfill from 'text-encoding';
import {Client, IMessage} from '@stomp/stompjs';
import {NavigationContainer} from '@react-navigation/native';

import {Routers} from './router/Router';
import {RootStackParams} from './router/Router';
import {BoardProvider} from './context/board/BoardContext';
import {AuthProvider} from './context/auth/AuthContext';
import {CartProvider} from './context/cart/CartContext';
import {SERVICE_CALL} from '../environment/environment.prod';
import {ReservationProvider} from './context/reservation/ReservationContext';
import {UnitDeliveryProvider} from './context/unitDelivery/UnitDeliveryContext';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <BoardProvider>
        <UnitDeliveryProvider>
          <ReservationProvider>
            <CartProvider>{children}</CartProvider>
          </ReservationProvider>
        </UnitDeliveryProvider>
      </BoardProvider>
    </AuthProvider>
  );
};

export const _stompClient: Client = new Client();
const App = () => {
  const url = SERVICE_CALL.concat('/chat-websocket');
  _stompClient.activate();

  _stompClient.configure({
    brokerURL: url,
    reconnectDelay: 500,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: false,
    webSocketFactory: () => SockJS(url),

    onConnect: () => {
      _stompClient.subscribe('/notify/deliver', (e: IMessage) => {
        Toast.show({
          text1: e.body,
          text2: 'Pedido listo',
          autoHide: true,
          bottomOffset: 40,
          position: 'top',
          visibilityTime: 5000,
          type: 'success',
        });
      });
    },
  });
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => setTheme(scheme.colorScheme));

  return (
    <NavigationContainer>
      <AppState>
        <Routers />
        <Toast />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
