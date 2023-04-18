import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';

import {specialityApis} from '../../../api/SpecialityApi';
import {FoodCard} from '../../../components/food/FoodCard';
import {AuthContext} from '../../../context/auth/AuthContext';
import {NotifyContext} from '../../../context/notifies/NotifyContext';
import PickerSpeciality from '../../../components/pickers/PickerSpeciality';
import {ProductResponse} from '../../../model/response/entity/ItemResponse';
import {useItemPaginated} from '../../../hooks/items/products/useProductHooks';
import {SpecialtyResponse} from '../../../model/response/entity/SpecialtyResponse';

const FoodMenu = () => {
  const {specialityApi} = specialityApis();
  const {myPersonalData} = useContext(AuthContext);
  const {startNotifiesServices} = useContext(NotifyContext);
  const {loading, collection, findAll, reload} = useItemPaginated();

  const [speciality, setSpeciality] = useState<number>(0);

  useEffect(() => {
    setSpeciality(speciality);
    reload(speciality);
  }, [speciality]);

  useEffect(() => {
    startNotifiesServices();
    let endpoint: string = `/findByName?name=${myPersonalData.specialty}`;

    async function fetchData() {
      const response = await specialityApi.get<SpecialtyResponse>(endpoint);
      let id: number = response.data.id;
      setSpeciality(id);
      findAll(id);
    }
    fetchData();
  }, []);

  return (
    <View style={style.container}>
      <PickerSpeciality value={speciality} onChangeValue={setSpeciality} />
      <FlatList
        data={collection}
        numColumns={2}
        keyExtractor={(item: ProductResponse) => item.cod}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <FoodCard food={item} />}
        onEndReachedThreshold={0.4}
        onEndReached={() => reload(speciality)}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{height: 30}} size={20} color='grey' />
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: 'center',
  },
});

export default FoodMenu;
