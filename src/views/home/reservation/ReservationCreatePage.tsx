import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";

import { BoardContext } from "../../../context/BoardContext";
import { ReservationContext } from "../../../context/reservation/ReservationContext";
import { ReservationByUserRequest } from "../../../model/request/ReservationByUserRequest";

const width = Dimensions.get("window").width;

const ReservationCreatePage = () => {
  const [dni, setDni] = useState("");
  const [board, setBoard] = useState("");

  const { loading, addReservation, message, success } =
    useContext(ReservationContext);
  const { collection } = useContext(BoardContext);

  const saveReservation = () => {
    const request: ReservationByUserRequest = { dni: dni, name: board };
    addReservation({ dni: request.dni, name: request.name });
  };

  useEffect(() => {
    if (message == null || message.length === 0) {
      return;
    }

    Toast.show({
      type: success ? "success" : "error",
      position: "bottom",
      text1: message,
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,
    });

    setDni("");
    setBoard("");
  }, [message]);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer} mode="outlined">
        <Card.Title title="Registrar" />
        <Card.Content>
          <Picker selectedValue={board} onValueChange={setBoard}>
            <Picker.Item key={-1} label="Seleccionar una mesa" value="" />
            {collection.map((value, i) => (
              <Picker.Item key={i} label={value.name} value={value.name} />
            ))}
          </Picker>
          <TextInput
            keyboardType="numeric"
            label="Dni del cliente"
            onChangeText={setDni}
            mode="outlined"
            value={dni}
          />
        </Card.Content>
        <Card.Actions style={{ margin: 15, justifyContent: "center" }}>
          <Button
            loading={loading}
            disabled={loading}
            mode="contained"
            style={{ width: 300 }}
            onPress={saveReservation}
          >
            Registrar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    width: width * (5 / 6),
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default ReservationCreatePage;
