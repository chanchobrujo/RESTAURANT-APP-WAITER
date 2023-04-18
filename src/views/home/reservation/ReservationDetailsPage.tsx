import React, {useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import {Card, Title, Divider, Paragraph, ActivityIndicator} from 'react-native-paper';

import {RootStackParams} from '../../../router/Router';
import {CartContext} from '../../../context/cart/CartContext';
import {CartDetails} from '../../../components/cart/CartDetails';
import {NotifyContext} from '../../../context/notifies/NotifyContext';
import {CartResponse} from '../../../model/response/entity/CartResponse';

interface Props extends StackScreenProps<RootStackParams, 'ReservationDetails'> {}

const width = Dimensions.get('window').width;

const ReservationDetailsPage = ({navigation, route}: Props) => {
  const {reservation} = route.params;
  const {showToastMessage} = useContext(NotifyContext);
  const {loading, findAll, collection, message, success} = React.useContext(CartContext);

  useEffect(() => {
    findAll(reservation.id);
  }, []);

  useEffect(() => {
    if (message == null || message.length === 0) return;

    showToastMessage(success, message, '');
    navigation.pop();
  }, [message]);

  return (
    <View style={{...style.content, alignItems: 'center'}}>
      <Card style={style.cardContainer}>
        <Card.Title title='Detalle de la reserva' />
        <Card.Content>
          <Title>
            {reservation.board
              ? reservation.board
              : 'Unidad delivery: ' + reservation.details['delivery unit']}
          </Title>
          <Divider style={{marginVertical: 10}} />
          <Title>Cliente</Title>
          <Paragraph>{reservation.customer}</Paragraph>
          <Divider style={{marginVertical: 10}} />
          <Title>{reservation.dateCreated}</Title>
          <Divider style={{marginVertical: 10}} />
          <Title>{'Estado: ' + reservation.details.state}</Title>
        </Card.Content>
      </Card>
      <Divider style={{marginVertical: 10}} />
      {loading ? (
        <ActivityIndicator size={15} />
      ) : (
        <ScrollView style={style.content}>
          {collection
            .filter(cart => cart.estado != 'Pagado')
            .map((value: CartResponse, i: number) => (
            <CartDetails key={i} cart={value} board={reservation.board} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    backgroundColor: '#EAE8E7',
    flex: 1,
  },
  cardContainer: {
    borderRadius: 10,
    marginVertical: 20,
    width: width * (3 / 4),
  },
});

export default ReservationDetailsPage;
