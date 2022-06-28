import {Dimensions, StyleSheet, View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Divider, Switch, TextInput} from 'react-native-paper';

import PickerBoard from '../../../components/pickers/PickerBoard';
import {NotifyContext} from '../../../context/notifies/NotifyContext';
import PickerDelivery from '../../../components/pickers/PickerDelivery';
import {ReservationContext} from '../../../context/reservation/ReservationContext';
import {ReservationByUserRequest} from '../../../model/request/ReservationRequests';

const width = Dimensions.get('window').width;

const ReservationCreatePage = () => {
  const [dni, setDni] = useState('');
  const [unit_delivery, setDelivery] = useState('');
  const [board, setBoard] = useState('');

  const {loadingSave, addReservation, message, success, addReservationDelivery} =
    useContext(ReservationContext);

  const {showToastMessage} = useContext(NotifyContext);

  const [isDelivery, setIsDelivery] = useState(false);
  const onToggleSwitch = () => setIsDelivery(!isDelivery);

  const saveReservation = () => {
    if (!isDelivery) {
      const request: ReservationByUserRequest = {dni, name: board};
      addReservation(request);
    } else {
      addReservationDelivery({dni, unit_delivery});
    }
  };

  useEffect(() => {
    if (message == null || message.length === 0) {
      return;
    }

    showToastMessage(success, message, '');

    setDni('');
    setBoard('');
  }, [message]);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer} mode='outlined'>
        <Card.Title title='Registrar' />
        <Card.Content>
          <Divider style={{marginVertical: 10}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text>Es delivery?</Text>
            <Text> {isDelivery ? 'Si' : 'No'} </Text>
            <Switch
              color='blue'
              value={isDelivery}
              onValueChange={onToggleSwitch}
              style={{width: 90}}
            />
          </View>

          <Divider style={{marginVertical: 10}} />
          {isDelivery ? (
            <PickerDelivery
              enable={true}
              value={unit_delivery}
              onChangeValue={setDelivery}
            />
          ) : (
            <PickerBoard value={board} onChangeValue={setBoard} />
          )}

          <Divider style={{marginVertical: 10}} />
          <TextInput
            keyboardType='numeric'
            label='Dni del cliente'
            onChangeText={setDni}
            mode='outlined'
            value={dni}
          />
        </Card.Content>
        <Card.Actions style={{margin: 15, justifyContent: 'center'}}>
          <Button
            loading={loadingSave}
            disabled={loadingSave}
            mode='contained'
            style={{width: 300}}
            onPress={saveReservation}>
            Registrar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: width * (5 / 6),
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default ReservationCreatePage;
