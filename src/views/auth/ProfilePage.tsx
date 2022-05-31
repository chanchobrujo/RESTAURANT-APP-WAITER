import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../context/auth/AuthContext";

const Profile = () => {
  const { logOut, loading } = useContext(AuthContext);
  return (
    <View>
      <Text>Mis datos</Text>
      <Button loading={loading} onPress={logOut} color="red">
        <Text>Cerrar sesión</Text>
      </Button>
    </View>
  );
};

export default Profile;
