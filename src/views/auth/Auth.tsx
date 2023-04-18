import React, {useContext, useEffect} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {Logo} from '../../components/Logo';
import {useForm} from '../../hooks/UseHooks';
import {authStyles} from '../../theme/AuthTheme';
import {Background} from '../../components/Background';
import {AuthContext} from '../../context/auth/AuthContext';
import {NotifyContext} from '../../context/notifies/NotifyContext';

const Auth = () => {
  const {showToastMessage} = useContext(NotifyContext);
  const {signIn, errorMessage, removeError, loading} = useContext(AuthContext);

  const {username, password, onChangue} = useForm({
    username: 'IRM9090E8',
    password: 'kevin12345@',
  });

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({username, password});
  };

  useEffect(() => {
    if (errorMessage == null || errorMessage.length === 0) return;

    showToastMessage(false, errorMessage, 'Error de autenticación');
    removeError();
  }, [errorMessage]);

  return (
    <>
      <Background />

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={authStyles.formContainer}>
          <Logo />

          <Text style={{...authStyles.title, color: 'white'}}>Autenticación</Text>
          <Text style={{...authStyles.label, color: 'white'}}>Usuario</Text>

          <TextInput
            placeholder='Ingrese su usuario'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            style={authStyles.input}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChangue(value, 'username')}
            value={username}
          />

          <Text style={authStyles.label}>Contraseña</Text>

          <TextInput
            secureTextEntry
            placeholder='*********'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            style={authStyles.input}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChangue(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />

          <View style={authStyles.buttonContainer}>
            <Button mode='contained' loading={loading} onPress={onLogin} disabled={loading} style={authStyles.button}>
              Iniciar sesión
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Auth;
