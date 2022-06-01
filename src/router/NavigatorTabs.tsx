import * as React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../views/auth/ProfilePage";
import FoodMenu from "../views/home/food/FoodMenuPage";
import Reservation from "../views/home/reservation/ReservationPage";
import ReservationCreatePage from "../views/home/reservation/ReservationCreatePage";

const Tab = createBottomTabNavigator();

export const PrincipalTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={{ tabBarStyle: { height: 60 } }}
    >
      <Tab.Screen
        name="Menu"
        component={FoodMenu}
        options={{
          tabBarLabel: "Menú de platos",
          tabBarIcon: ({ color }) => (
            <Icon name="fast-food-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservaciones"
        component={Reservation}
        options={{
          tabBarLabel: "Reservaciones",
          tabBarIcon: ({ color }) => (
            <Icon name="documents-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Habilitar una reservación"
        component={ReservationCreatePage}
        options={{
          tabBarLabel: "Habilitar una reservaciones",
          tabBarIcon: ({ color }) => (
            <Icon name="restaurant-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarLabel: "Mi perfil",
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
