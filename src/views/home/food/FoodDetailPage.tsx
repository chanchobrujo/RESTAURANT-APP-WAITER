import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParams } from "../../../router/Router";
import { FadeInImage } from "../../../components/FadeInImage";
import { SERVICE_FILE } from "../../../../environment/environment.prod";
import { FoodDetailComponent } from "../../../components/food/FoodDetail";
import { ModalByAddProduct } from "../../../components/ModalByAddProduct";
import { useItemsById } from "../../../hooks/items/products/useProductById";

interface Props extends StackScreenProps<RootStackParams, "FoodDetails"> {}

const FoodDetails = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();

  const { food, color } = route.params;
  const { isLoading, item } = useItemsById(food.cod);
  const [modalVisible, setModalVisible] = useState(false);

  const [board, setBoard] = useState("");
  const [quantity, setQuantity] = useState("1");

  return (
    <View style={{ flex: 1 }}>
      <ModalByAddProduct
        value={modalVisible}
        onChangeValue={() => setModalVisible(false)}
        board={board}
        setBoard={setBoard}
        quantity={quantity}
        setQuantity={setQuantity}
        id={food.cod}
        color={color}
      />

      <View style={{ ...style.headerContainer, backgroundColor: color }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...style.backButton, top: top + 5 }}
          onPress={() => navigation.pop()}
        >
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <Text style={{ ...style.nameItem, fontSize: 30, top: top + 45 }}>
          {food.names[0]}
        </Text>
        <Text style={{ ...style.nameItem, fontSize: 25, top: top + 55 }}>
          {food.description[0]}
        </Text>

        <FadeInImage
          uri={SERVICE_FILE.concat(food.images[0])}
          style={style.image}
        />
      </View>

      {isLoading ? (
        <View style={style.loading}>
          <ActivityIndicator color={color} size={25} />
        </View>
      ) : (
        <FoodDetailComponent item={item} />
      )}
      <Button
        style={style.fab}
        color={color}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add-outline" color={color} size={50} />
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  nameItem: {
    color: "white",
    alignSelf: "flex-start",
    left: 20,
  },
  image: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: -20,

    borderRadius: 25,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FoodDetails;
