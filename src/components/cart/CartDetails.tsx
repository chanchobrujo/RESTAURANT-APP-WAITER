import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Divider, Title} from 'react-native-paper';

import {width} from '../../App';
import {LineCartDetails} from './LineCartDetails';
import {CartResponse} from '../../model/response/entity/CartResponse';

interface Props {
  cart: CartResponse;
  board: string;
}

export const CartDetails = ({cart, board}: Props) => {
  return (
    <Card style={style.cardContainer}>
      <Card.Title title={'Cuenta de ' + cart.customer} />
      <Card.Content>
        <Title style={{marginBottom: 2}}>
          {'Total a pagar ' + cart.total + ' soles.'}
        </Title>
        <Divider style={{marginVertical: 10}} />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cart.collection == null || cart.collection.length == 0 ? (
            <>
              <Title style={{marginRight: 15}}>Aun no tiene productos</Title>
              <Icon name='sad-outline' size={30} />
            </>
          ) : (
            cart.collection.map((line, i) => (
              <LineCartDetails key={i} id={cart.idLineRes} line={line} board={board} />
            ))
          )}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};
const style = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 30,
    width: width * (8 / 9),
  },
});
