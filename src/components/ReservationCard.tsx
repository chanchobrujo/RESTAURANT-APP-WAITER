import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  reservation: string;
}

const width = Dimensions.get("window").width;

export const ReservationCard = ({ reservation }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View
        style={{
          ...styles.cardContainer,
        }}
      >
        <View>
          <Text style={styles.nameCard}>{reservation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * (3 / 4),
    marginVertical: 20,
    borderRadius: 10,
    height: 160,

    backgroundColor: "white",
  },
  nameCard: {
    fontWeight: "bold",
    fontSize: 17,
    top: 15,
    left: 15,
  },
});
