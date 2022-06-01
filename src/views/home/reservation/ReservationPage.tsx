import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";

import { ReservationCard } from "../../../components/reservation/ReservationCard";
import { ReservationContext } from "../../../context/reservation/ReservationContext";
import { ActivityIndicator } from "react-native-paper";
import { ReservationResponse } from "../../../model/response/entity/ReservationResponse";

const Reservation = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { loading, findAll, collection } = useContext(ReservationContext);

  useEffect(() => {
    findAll();
  }, []);

  const findAllFromBackend = async () => {
    setIsRefreshing(true);
    await findAll();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={collection}
        numColumns={1}
        keyExtractor={(item: ReservationResponse) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ReservationCard reservation={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={findAllFromBackend}
          />
        }
        onEndReached={() => findAll()}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{ height: 30 }} size={20} color="grey" />
          ) : (
            <></>
          )
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
export default Reservation;
