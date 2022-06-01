import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "../views/auth/Auth";
import { PrincipalTabs } from "./NavigatorTabs";
import { AuthContext } from "../context/auth/AuthContext";
import FoodDetails from "../views/home/food/FoodDetailPage";
import { LoadingScreen } from "../components/LoadingScreen";
import { ProductResponse } from "../model/response/entity/ItemResponse";
import ReservationDetailsPage from "../views/home/reservation/ReservationDetailsPage";
import { ReservationResponse } from "../model/response/entity/ReservationResponse";

export type RootStackParams = {
  auth: undefined;
  home: undefined;

  ReservationDetails: { reservation: ReservationResponse };
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
          <Stack.Screen
            name="ReservationDetails"
            component={ReservationDetailsPage}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
