import {View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Button, Card, TextInput} from 'react-native-paper';

import {AuthContext} from '../../context/auth/AuthContext';
import {InputLabelNoEditable} from '../../components/InputLabelNoEditable';

const Profile = () => {
  const {logOut, myPersonalData} = useContext(AuthContext);

  return (
    <Card style={{margin: 15}}>
      <Card.Title title='Mis datos personales' />
      <Card.Content>
        <View style={{flexDirection: 'row'}}>
          <InputLabelNoEditable label='Nombres' value={myPersonalData.firstname} />
          <InputLabelNoEditable label='Apellidos' value={myPersonalData.lastname} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <InputLabelNoEditable label='Correo eletrónico' value={myPersonalData.email} />
          <InputLabelNoEditable
            label='Nombre de usuario'
            value={myPersonalData.username}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <InputLabelNoEditable label='Rol' value={myPersonalData.role} />
          <InputLabelNoEditable
            label='Especialidad'
            value={myPersonalData.specialty || ''}
          />
        </View>

        <TextInput
          mode='outlined'
          editable={false}
          label='Fecha de admisión'
          value={myPersonalData.created}
        />
      </Card.Content>
      <Card.Actions style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button color='red' onPress={logOut}>
          Cerrar sesión
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default Profile;
