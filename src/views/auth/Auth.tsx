import React, { useContext, useEffect } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

import { Logo } from "../../components/Logo";
import { authStyles } from "../../theme/AuthTheme";
import { Background } from "../../components/Background";
import { useForm } from "../../hooks/UseHooks";
import { AuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { username, password, onChangue } = useForm({
    username: "KEVIND4B60B",
    password: "kevin12345@",
  });

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({ username, password });
  };

  useEffect(() => {
    if (errorMessage == null || errorMessage.length === 0) {
      return;
    }

    Toast.show({
      type: "error",
      position: "bottom",
      text2: "Error de autenticación",
      text1: errorMessage,
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,
    });
    removeError();
  }, [errorMessage]);

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={authStyles.formContainer}>
          <Logo />

          <Text style={authStyles.title}>Autenticación</Text>
          <Text style={authStyles.label}>Usuario</Text>

          <TextInput
            placeholder="Ingrese su usuario"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={authStyles.input}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChangue(value, "username")}
            value={username}
          />

          <Text style={authStyles.label}>Contraseña</Text>

          <TextInput
            secureTextEntry
            placeholder="*********"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={authStyles.input}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChangue(value, "password")}
            value={password}
            onSubmitEditing={onLogin}
          />

          <View style={authStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={authStyles.button}
              onPress={onLogin}
            >
              <Text style={authStyles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Auth;
