import React from "react";
import Toast from "react-native-toast-message";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

interface Props {
  reservation: string;
}

const width = Dimensions.get("window").width;

export const ReservationCard = ({ reservation }: Props) => {
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
      <Card.Title title="Mesa 101" subtitle="16/15/28 3:45" />
      <Card.Content>
        <Title>Kevin Anderson Palma Lluén</Title>
        <Paragraph>Total a pagar: 125 Soles.</Paragraph>
        <Paragraph>{reservation}</Paragraph>
      </Card.Content>

      {/**<Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <Card.Actions>
        <Button>Detalles</Button>
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
