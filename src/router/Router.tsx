import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../views/auth/Auth";
import Home from "../views/home/Home";
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      {status != "authenticated" ? (
        <>
          <Stack.Screen name="auth" component={Auth}></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="home" component={Home}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
