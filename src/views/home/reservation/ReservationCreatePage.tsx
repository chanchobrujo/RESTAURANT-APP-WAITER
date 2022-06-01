import Toast from "react-native-toast-message";
import { Dimensions, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, TextInput } from "react-native-paper";

import PickerBoard from "../../../components/PickerBoard";
import { ReservationContext } from "../../../context/reservation/ReservationContext";
import { ReservationByUserRequest } from "../../../model/request/ReservationByUserRequest";

const width = Dimensions.get("window").width;

const ReservationCreatePage = () => {
  const [dni, setDni] = useState("");
  const [board, setBoard] = useState("");

  const { loadingSave, addReservation, message, success } =
    useContext(ReservationContext);

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
          <PickerBoard value={board} onChangeValue={setBoard} />
          <Divider style={{ marginVertical: 10 }} />
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
            loading={loadingSave}
            disabled={loadingSave}
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
