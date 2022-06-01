import React from "react";
import { ActivityIndicator, StyleSheet, View, FlatList } from "react-native";

import { FoodCard } from "../../../components/food/FoodCard";
import { ProductResponse } from "../../../model/response/entity/ItemResponse";
import { useItemPaginated } from "../../../hooks/items/products/useProductHooks";

const FoodMenu = () => {
  const { loading, collection, findAll } = useItemPaginated();

  return (
    <>
      <View style={style.container}>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={collection}
            numColumns={2}
            keyExtractor={(item: ProductResponse) => item.cod}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <FoodCard food={item} />}
            onEndReachedThreshold={0.4}
            onEndReached={() => findAll()}
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
    </>
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

export default FoodMenu;
