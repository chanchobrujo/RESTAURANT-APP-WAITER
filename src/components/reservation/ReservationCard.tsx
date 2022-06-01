import React from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { Alert, Dimensions, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { ReservationResponse } from "../../model/response/entity/ReservationResponse";

interface Props {
  reservation: ReservationResponse;
}

const width = Dimensions.get("window").width;

export const ReservationCard = ({ reservation }: Props) => {
  const navigation = useNavigation();
  const cancelReservation = (): void => {
    Toast.show({
      type: "success",
      position: "bottom",
      text2: "Error de autenticación",
      text1: "Mensaje",
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const showAlert = (): void => {
    Alert.alert("Alerta", "¿Desea anular esta cuenta?", [
      {
        text: "Si",
        onPress: () => cancelReservation(),
      },
      { text: "No" },
    ]);
  };

  return (
    <Card style={styles.cardContainer} mode="outlined">
      <Card.Title
        title={reservation.board}
        subtitle={reservation.dateCreated}
      />
      <Card.Content>
        <Title>{reservation.customer}</Title>
        <Paragraph>{reservation.details.state}</Paragraph>
      </Card.Content>

      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate("ReservationDetails", {
              reservation: reservation,
            })
          }
        >
          Detalles
        </Button>
        <Button color="red" onPress={showAlert}>
          Cancelar
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * (5 / 6),
    marginVertical: 20,
    borderRadius: 10,
  },
});
