import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';

import {specialityApis} from '../../../api/SpecialityApi';
import {FoodCard} from '../../../components/food/FoodCard';
import {AuthContext} from '../../../context/auth/AuthContext';
import {ProductResponse} from '../../../model/response/entity/ItemResponse';
import {useItemPaginated} from '../../../hooks/items/products/useProductHooks';
import {SpecialtyResponse} from '../../../model/response/entity/SpecialtyResponse';

const FoodMenu = () => {
  const {myPersonalData} = useContext(AuthContext);
  const {specialityApi} = specialityApis();

  const [speciality, setSpeciality] = useState<number>(0);
  const {loading, collection, findAll} = useItemPaginated();

  useEffect(() => {
    let endpoint: string = `/findByName?name=${myPersonalData.specialty}`;

    async function fetchData() {
      const response = await specialityApi.get<SpecialtyResponse>(endpoint);
      setSpeciality(response.data.id);
      findAll(response.data.id);
    }
    fetchData();
  }, []);

  return (
    <View style={style.container}>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={collection}
          numColumns={2}
          keyExtractor={(item: ProductResponse) => item.cod}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FoodCard food={item} />}
          onEndReachedThreshold={0.4}
          onEndReached={() => findAll(speciality)}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator style={{height: 30}} size={20} color='grey' />
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
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodMenu;
