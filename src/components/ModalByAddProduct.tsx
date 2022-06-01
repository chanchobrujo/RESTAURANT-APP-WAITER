import Toast from "react-native-toast-message";
import React, { useContext, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";
import { Button, Card, TextInput, Title } from "react-native-paper";

import PickerBoard from "./PickerBoard";
import { CartContext } from "../context/cart/CartContext";

interface Props {
  id: string;

  value: boolean;
  onChangeValue: any;

  quantity: string;
  setQuantity: any;

  board: string;
  setBoard: any;
  color: string;
}

const width = Dimensions.get("window").width;

export const ModalByAddProduct = ({
  value,
  onChangeValue,
  quantity,
  setQuantity,
  board,
  setBoard,
  id,
  color,
}: Props) => {
  const { addProduct, message, success, loadingSave } = useContext(CartContext);

  const addProductByUser = () => {
    addProduct(board, id, parseInt(quantity));
  };

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

    setQuantity("1");
    setBoard("");
    onChangeValue();
  }, [message]);

  return (
    <Modal animationType="fade" transparent={true} visible={value}>
      <View style={style.centeredView}>
        <Card style={style.modalView}>
          <Card.Title title="Agregar a una mesa" />

          <Card.Content style={{ marginBottom: 20 }}>
            <Title>Cantidad a llevar</Title>
            <TextInput
              onChangeText={setQuantity}
              style={{ width: 100 }}
              keyboardType="numeric"
              label="Cantidad"
              mode="outlined"
              value={quantity}
            />
          </Card.Content>

          <Card.Content style={{ marginBottom: 20 }}>
            <Title>Elija una mesa</Title>
            <PickerBoard value={board} onChangeValue={setBoard} />
          </Card.Content>

          <Card.Actions>
            <Button
              color={color}
              onPress={addProductByUser}
              loading={loadingSave}
            >
              Agregar
            </Button>
            <Button color="red" onPress={onChangeValue}>
              Cancelar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    width: width * (3 / 5),
  },
});
