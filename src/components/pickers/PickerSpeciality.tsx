import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';

import {useSpecialityFindAll} from '../../hooks/items/speciality/useSpecialityHooks';

interface Props {
  value: number;
  onChangeValue: any;
}

const PickerSpeciality = ({value, onChangeValue}: Props) => {
  const {loading, collection, findAllSpecialties} = useSpecialityFindAll();

  useEffect(() => {
    findAllSpecialties();
  }, []);

  return (
    <Picker selectedValue={value} onValueChange={onChangeValue}>
      <Picker.Item key={-1} label='Seleccione una espcialidad' value='' enabled={false} />
      {collection.map((item, i) => (
        <Picker.Item key={i} label={item.name} value={item.id} />
      ))}
    </Picker>
  );
};

export default PickerSpeciality;
