import React, { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native-paper";

import { BoardContext } from "../context/board/BoardContext";

interface Props {
  value: string;
  onChangeValue: any;
}

const PickerBoard = ({ value, onChangeValue }: Props) => {
  const { collection, loading } = useContext(BoardContext);

  return loading ? (
    <ActivityIndicator size={20} />
  ) : (
    <Picker selectedValue={value} onValueChange={onChangeValue}>
      <Picker.Item key={-1} label="Seleccionar una mesa" value="" />
      {collection.map((value, i) => (
        <Picker.Item key={i} label={value.name} value={value.name} />
      ))}
    </Picker>
  );
};

export default PickerBoard;
