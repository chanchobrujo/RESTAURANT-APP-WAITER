import React, { useState } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { ReservationCard } from "../../../components/ReservationCard";

const Reservation = () => {
  const collection: string[] = ["Fecha 25/16/8", "b", "c", "f", "g", "h"];
  return (
    <View style={style.container}>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={collection}
          numColumns={1}
          keyExtractor={(item: string) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ReservationCard reservation={item} />}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Reservation;
