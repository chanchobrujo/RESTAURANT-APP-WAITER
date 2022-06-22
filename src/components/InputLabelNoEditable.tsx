import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface Props {
  label: string;
  value: string;
}

export const InputLabelNoEditable = ({label, value}: Props) => {
  return (
    <View style={styles.inputWrap}>
      <TextInput label={label} mode='outlined' value={value} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    margin: 5,
  },
});
