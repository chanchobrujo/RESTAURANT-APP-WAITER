import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { FadeInImage } from "./FadeInImage";
import { SERVICE_FILE } from "../../environment/environment.prod";
import { ProductResponse } from "../model/response/entity/ItemResponse";

interface Props {
  item: ProductResponse;
}

export const FoodDetailComponent = ({ item }: Props) => {
  return (
    <ScrollView style={{ ...StyleSheet.absoluteFillObject }}>
      <View style={{ ...style.container, marginTop: 450 }}>
        <Text style={style.title}>Categoria: </Text>
        <Text style={style.regularText}>{item.category}</Text>

        <Text style={style.title}>Precio</Text>
        <Text style={style.regularText}>
          {item.price} soles, por unidad ( {item.metric} )
        </Text>

        <Text style={style.title}>Stock</Text>
        <Text style={style.regularText}>{item.stock}</Text>
      </View>

      <View style={style.container}>
        <Text style={style.title}>Imagenes: </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {item.images.map((value, i) => (
          <FadeInImage
            key={i}
            uri={SERVICE_FILE.concat(value)}
            style={style.basicSprite}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: { marginHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 7 },
  regularText: { fontSize: 19, color: "grey" },
  basicSprite: {
    width: 100,
    height: 100,
    marginHorizontal: 15,
    marginVertical: 7,
    borderRadius: 25,
  },
});
