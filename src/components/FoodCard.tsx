import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SERVICE_FILE } from "../../environment/environment.prod";
import { ProductResponse } from "../model/response/entity/ItemResponse";
import { FadeInImage } from "./FadeInImage";

import ImageColors from "react-native-image-colors";
import { useNavigation } from "@react-navigation/native";

interface Props {
  food: ProductResponse;
}

const width = Dimensions.get("window").width;

export const FoodCard = ({ food }: Props) => {
  const [bgColor, setBgColor] = useState("grey");
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    let image: string = SERVICE_FILE.concat(food.images[0]);
    ImageColors.getColors(image, {
      fallback: "grey",
    }).then((color: any) => {
      if (!isMounted.current) return;

      setBgColor(color.darkVibrant || "grey");
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("FoodDetails", { food: food, color: bgColor })
      }
    >
      <View
        style={{
          ...styles.cardContainer,
          width: width * 0.4,
          backgroundColor: bgColor,
        }}
      >
        <View>
          <Text style={styles.nameCard}>{food.names[0]}</Text>
        </View>

        <FadeInImage
          uri={SERVICE_FILE.concat(food.images[0])}
          style={styles.foodImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: 160,
    width: 160,
    marginBottom: 35,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 15,

    overflow: "hidden",
  },
  nameCard: {
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "white",
    fontSize: 15,
    top: 10,
    left: 5,
  },
  foodImage: {
    width: 140,
    height: 120,
    position: "absolute",
    right: -8,
    bottom: -5,
    borderRadius: 10,
  },
});
