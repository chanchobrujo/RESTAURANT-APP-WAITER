import React, { useContext } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { AuthContext } from "../../context/AuthContext";
import { useItemPaginated } from "../../hooks/ItemsHooks";
import { ProductResponse } from "../../model/response/entity/ItemResponse";

import { FoodCard } from "../../components/FoodCard";

const FoodMenu = () => {
  const { logOut } = useContext(AuthContext);
  const { loading, collection, findAll } = useItemPaginated();

  return (
    <View style={style.container}>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={collection}
          numColumns={2}
          keyExtractor={(item: ProductResponse) => item.cod}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FoodCard food={item} />}
          onEndReached={findAll}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                style={{ height: 30 }}
                size={20}
                color="grey"
              />
            ) : (
              <></>
            )
          }
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default FoodMenu;
