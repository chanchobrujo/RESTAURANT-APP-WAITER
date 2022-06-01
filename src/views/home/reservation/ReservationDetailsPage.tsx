import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { StackScreenProps } from "@react-navigation/stack";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Card,
  Divider,
  Paragraph,
  Title,
} from "react-native-paper";

import { RootStackParams } from "../../../router/Router";
import { ScrollView } from "react-native-gesture-handler";
import { CartContext } from "../../../context/cart/CartContext";
import { CartDetails } from "../../../components/cart/CartDetails";

interface Props
  extends StackScreenProps<RootStackParams, "ReservationDetails"> {}

const width = Dimensions.get("window").width;
const ReservationDetailsPage = ({ navigation, route }: Props) => {
  const { loading, findAll, collection, message, success } =
    React.useContext(CartContext);
  const { reservation } = route.params;

  const retriveCart = () => {
    findAll(reservation.id);
  };

  useEffect(() => {
    retriveCart();
  }, []);

  useEffect(() => {
    if (message == null || message.length === 0) {
      return;
    }

    Toast.show({
      text1: message,
      autoHide: true,
      bottomOffset: 40,
      position: "bottom",
      visibilityTime: 5000,
      type: success ? "success" : "error",
    });
    navigation.pop();
  }, [message]);

  return (
    <View style={{ ...style.conten, ...style.container }}>
      <Card style={style.cardContainer}>
        <Card.Title title="Detalle de la reserva" />
        <Card.Content>
          <Title>{reservation.board}</Title>
          <Divider style={{ marginVertical: 10 }} />
          <Title>Cliente</Title>
          <Paragraph>{reservation.customer}</Paragraph>
          <Divider style={{ marginVertical: 10 }} />
          <Title>{reservation.dateCreated}</Title>
          <Divider style={{ marginVertical: 10 }} />
          <Title>{"Estado: " + reservation.details.state}</Title>
        </Card.Content>
      </Card>
      <Divider style={{ marginVertical: 10 }} />
      {loading ? (
        <ActivityIndicator size={15} />
      ) : (
        <ScrollView style={style.conten}>
          {collection.map((value, i) => (
            <CartDetails key={i} cart={value} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  conten: {
    backgroundColor: "#EAE8E7",
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  cardContainer: {
    borderRadius: 10,
    marginVertical: 20,
    width: width * (3 / 4),
  },
});

export default ReservationDetailsPage;
