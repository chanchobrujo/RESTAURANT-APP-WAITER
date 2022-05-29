import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../views/auth/Auth";

import FoodDetails from "../views/home/food/FoodDetailPage";

import { AuthContext } from "../context/AuthContext";
import { LoadingScreen } from "../components/LoadingScreen";
import { PrincipalTabs } from "./NavigatorTabs";
import { ProductResponse } from "../model/response/entity/ItemResponse";

export type RootStackParams = {
  auth: undefined;
  home: undefined;
  FoodDetails: { food: ProductResponse; color: string };
};

const Stack = createStackNavigator<RootStackParams>();

export const Routers = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") return <LoadingScreen />;
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
          <Stack.Screen name="home" component={PrincipalTabs}></Stack.Screen>
          <Stack.Screen
            name="FoodDetails"
            component={FoodDetails}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
