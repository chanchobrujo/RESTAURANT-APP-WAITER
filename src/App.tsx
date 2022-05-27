import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Routers } from "./router/Router";
import { AuthProvider } from "./context/AuthContext";

const AppState = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Routers />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
