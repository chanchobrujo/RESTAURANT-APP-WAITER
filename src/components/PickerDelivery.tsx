import React, { useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native-paper";

import { UnitDeliveryContext } from "../context/unitDelivery/UnitDeliveryContext";

interface Props {
  enable: boolean;
  value: string;
  onChangeValue: any;
}

const PickerDelivery = ({ enable, value, onChangeValue }: Props) => {
  const {
    collection,
    loading,
    retriveUnitDelivery,
    retriveOccupiedUnitDelivery,
  } = useContext(UnitDeliveryContext);

  useEffect(() => {
    if (enable) {
      retriveUnitDelivery();
    } else {
      retriveOccupiedUnitDelivery();
    }
  }, []);

  return loading ? (
    <ActivityIndicator size={20} />
  ) : (
    <Picker selectedValue={value} onValueChange={onChangeValue}>
      <Picker.Item key={-1} label="Seleccionar una unidad delivery" value="" />
      {collection.map((value, i) => (
        <Picker.Item
          key={i}
          label={
            value.typeVehicule +
            " " +
            value.details.person +
            " " +
            value.licensePlate
          }
          value={value.licensePlate}
        />
      ))}
    </Picker>
  );
};
export default PickerDelivery;
