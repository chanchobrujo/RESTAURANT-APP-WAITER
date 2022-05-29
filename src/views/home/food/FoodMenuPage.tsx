import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, StyleSheet, View, FlatList } from "react-native";

import { FoodCard } from "../../../components/FoodCard";
import { ProductResponse } from "../../../model/response/entity/ItemResponse";
import { useItemPaginated } from "../../../hooks/items/products/useProductHooks";
import { useCategoryFindAll } from "../../../hooks/items/category/useCategoryHooks";

const FoodMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { loading, collection, findAll } = useItemPaginated();

  const { loadingCategories, collectionCategories, findAllCategories } =
    useCategoryFindAll();

  return (
    <>
      {!loadingCategories ? (
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
          }}
        >
          <Picker.Item label="Todo" value="" />
          {collectionCategories.map((value, i) => (
            <Picker.Item key={i} label={value} value={value} />
          ))}
        </Picker>
      ) : (
        <ActivityIndicator style={{ height: 30 }} size={20} color="grey" />
      )}

      <View style={style.container}>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={collection}
            numColumns={2}
            keyExtractor={(item: ProductResponse) => item.cod}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <FoodCard food={item} />}
            onEndReached={() => findAll()}
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
