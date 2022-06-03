import { Client, Message } from "@stomp/stompjs";
import TextEncodingPolyfill from "text-encoding";
import SockJS from "sockjs-client";

import "react-native-gesture-handler";
import React, { useState } from "react";
import { Appearance } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import { Routers } from "./router/Router";
import { BoardProvider } from "./context/BoardContext";
import { AuthProvider } from "./context/auth/AuthContext";
import { CartProvider } from "./context/cart/CartContext";
import { SERVICE_MAINTENANCES } from "../environment/environment.prod";
import { ReservationProvider } from "./context/reservation/ReservationContext";

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <BoardProvider>
        <ReservationProvider>
          <CartProvider>{children}</CartProvider>
        </ReservationProvider>
      </BoardProvider>
    </AuthProvider>
  );
};

export const _stompClient: Client = new Client();
const App = () => {
  const url = SERVICE_MAINTENANCES.concat("/chat-websocket");
  _stompClient.activate();

  _stompClient.configure({
    brokerURL: url,
    connectHeaders: {},
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 500,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: false,
    webSocketFactory: () => {
      return SockJS(url);
    },

    onConnect: (val) => console.log("Conectado: " + true + " " + val),
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
