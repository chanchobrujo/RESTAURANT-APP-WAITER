import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Routers } from "./router/Router";
import { AuthProvider } from "./context/AuthContext";
import Toast from "react-native-toast-message";

const AppState = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

const App = () => {
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
