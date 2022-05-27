import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <View>
      <Text>Mis datos</Text>
      <Button onPress={logOut} title="Cerrar sesión" color="#5856D6" />
    </View>
  );
};

export default Profile;
