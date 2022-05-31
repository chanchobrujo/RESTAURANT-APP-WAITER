import "react-native-gesture-handler";
import React, { useState } from "react";
import { Appearance } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import { Routers } from "./router/Router";
import { AuthProvider } from "./context/auth/AuthContext";
import { ReservationProvider } from "./context/reservation/ReservationContext";
import { BoardProvider } from "./context/BoardContext";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <BoardProvider>
        <ReservationProvider>{children}</ReservationProvider>
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
