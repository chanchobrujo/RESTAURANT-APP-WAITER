import React, {useContext} from 'react';
import {Card, Paragraph, Title, TextInput} from 'react-native-paper';

import {AuthContext} from '../../context/auth/AuthContext';

const Profile = () => {
  const {logOut, loading} = useContext(AuthContext);
  return (
    <Card>
      <Card.Title title='Mis datos' />
      <Card.Content>
        <TextInput label='Email' mode='outlined' value='H@gmail.com' />
      </Card.Content>
    </Card>
    /**
     * <View style={authStyles.formContainer}>
      <Text style={authStyles.title}>Mis datos</Text>

      <>
        <Text style={authStyles.label}>Usuario</Text>
        <Text style={authStyles.input}>N</Text>
      </>

      <Button loading={loading} onPress={logOut} color='red'>
        <Text>Cerrar sesión</Text>
      </Button>
    </View>
     */
  );
};

export default Profile;
