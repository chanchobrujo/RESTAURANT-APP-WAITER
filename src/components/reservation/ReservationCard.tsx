import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Alert, Dimensions, StyleSheet} from 'react-native';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {ReservationResponse} from '../../model/response/entity/ReservationResponse';
import {NotifyContext} from '../../context/notifies/NotifyContext';

interface Props {
  reservation: ReservationResponse;
}

const width = Dimensions.get('window').width;

export const ReservationCard = ({reservation}: Props) => {
  const {showToastMessage} = useContext(NotifyContext);

  const navigation = useNavigation();
  const cancelReservation = (): void => {
    showToastMessage(true, 'Cancelado correctamente', 'Mesnsaje');
  };

  const showAlert = (): void => {
    Alert.alert('Alerta', '¿Desea anular esta cuenta?', [
      {
        text: 'Si',
        onPress: () => cancelReservation(),
      },
      {text: 'No'},
    ]);
  };

  return (
    <Card style={styles.cardContainer} mode='outlined'>
      <Card.Title
        title={
          reservation.board
            ? reservation.board
            : 'Unidad delivery: ' + reservation.details['delivery unit']
        }
        subtitle={reservation.dateCreated}
      />

      <Card.Content>
        <Title>{reservation.customer}</Title>
        <Paragraph>{reservation.details.state}</Paragraph>
      </Card.Content>

      <Card.Actions>
        <Button onPress={() => navigation.navigate('ReservationDetails', {reservation})}>
          Detalles
        </Button>
        <Button color='red' onPress={showAlert}>
          Cancelar
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * (5 / 6),
    marginVertical: 20,
    borderRadius: 10,
  },
});
