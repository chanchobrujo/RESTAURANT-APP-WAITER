import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState } from "react";

import { BoardContext } from "../context/BoardContext";

interface Props {
  value: string;
  onChangeValue: any;
}

const PickerBoard = ({ value, onChangeValue }: Props) => {
  const { collection } = useContext(BoardContext);

  return (
    <Picker selectedValue={value} onValueChange={onChangeValue}>
      <Picker.Item key={-1} label="Seleccionar una mesa" value="" />
      {collection.map((value, i) => (
        <Picker.Item key={i} label={value.name} value={value.name} />
      ))}
    </Picker>
  );
};

export default PickerBoard;
