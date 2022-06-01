import "react-native-gesture-handler";
import React, { useState } from "react";
import { Appearance } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import { Routers } from "./router/Router";
import { BoardProvider } from "./context/BoardContext";
import { AuthProvider } from "./context/auth/AuthContext";
import { ReservationProvider } from "./context/reservation/ReservationContext";
import { CartProvider } from "./context/cart/CartContext";

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

const App = () => {
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
