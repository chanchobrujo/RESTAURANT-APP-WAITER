import {useState} from 'react';

import {specialityApis} from '../../../api/SpecialityApi';
import {SpecialtyResponse} from '../../../model/response/entity/SpecialtyResponse';

export const useSpecialityFindAll = () => {
  const {specialityApi} = specialityApis();

  const [loading, setLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<SpecialtyResponse[]>([]);

  const findAllSpecialties = async () => {
    setLoading(true);
    try {
      let res = await specialityApi.get<SpecialtyResponse[]>('/');
      setCollection(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {loading, collection, findAllSpecialties};
};
