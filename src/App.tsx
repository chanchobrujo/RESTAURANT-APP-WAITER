import React from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
import TextEncodingPolyfill from 'text-encoding';
import {NavigationContainer} from '@react-navigation/native';

import {Routers} from './router/Router';
import {RootStackParams} from './router/Router';
import {AuthProvider} from './context/auth/AuthContext';
import {CartProvider} from './context/cart/CartContext';
import {BoardProvider} from './context/board/BoardContext';
import {SERVICE_NOTIFICATIONS} from '../environment/environment.prod';
import {NotifyProvider} from './context/notifies/NotifyContext';
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

export const _stompClient: Client = new Client();
export const width = Dimensions.get('window').width;
export const url = SERVICE_NOTIFICATIONS.concat('/chat-websocket');

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <NotifyProvider>
        <BoardProvider>
          <UnitDeliveryProvider>
            <ReservationProvider>
              <CartProvider>{children}</CartProvider>
            </ReservationProvider>
          </UnitDeliveryProvider>
        </BoardProvider>
      </NotifyProvider>
    </AuthProvider>
  );
};

const App = () => {
  _stompClient.activate();

  _stompClient.configure({
    brokerURL: url,
    reconnectDelay: 500,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: false,
    webSocketFactory: () => SockJS(url),
  });

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
