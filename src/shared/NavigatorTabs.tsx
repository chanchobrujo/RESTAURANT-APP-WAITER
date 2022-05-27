import * as React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../views/auth/ProfilePage";
import FoodMenu from "../views/home/FoodMenuPage";
import Reservations from "../views/home/ReservationPage";

const Tab = createBottomTabNavigator();

export const PrincipalTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={FoodMenu}
        options={{
          tabBarLabel: "Menú de comida",
          tabBarIcon: ({ color }) => (
            <Icon name="fast-food-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservaciones"
        component={Reservations}
        options={{
          tabBarLabel: "Reservaciones en mesas",
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
