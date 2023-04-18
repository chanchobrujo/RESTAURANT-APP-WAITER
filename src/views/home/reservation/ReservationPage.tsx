import {FlatList, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ReservationCard} from '../../../components/reservation/ReservationCard';
import {ReservationContext} from '../../../context/reservation/ReservationContext';
import {ReservationResponse} from '../../../model/response/entity/ReservationResponse';

const Reservation = () => {
  const {loading, collection, findAll} = useContext(ReservationContext);

  useEffect(() => {
    findAll();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        numColumns={1}
        data={collection}
        keyExtractor={(item: ReservationResponse) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ReservationCard reservation={item} />}
        onEndReached={findAll}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{height: 30}} size={20} color='grey' />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Reservation;
