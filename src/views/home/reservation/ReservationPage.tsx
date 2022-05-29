import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { ReservationCard } from "../../../components/ReservationCard";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Reservation = () => {
  const collection: string[] = ["Fecha", "b", "c", "f", "g", "h"];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={collection}
        numColumns={1}
        keyExtractor={(item: string) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ReservationCard reservation={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
{
  /**

       */
}
export default Reservation;
