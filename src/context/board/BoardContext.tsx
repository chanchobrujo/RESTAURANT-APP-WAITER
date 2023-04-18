import React, {createContext, useEffect, useState} from 'react';

import {apis} from '../../api/BoardApi';
import {BoardResponse} from '../../model/response/entity/BoardResponse';
import {BoardResponseCollection} from '../../model/response/retrive/BoardResponseCollection';

type BoardContextProps = {
  loading: boolean;
  collection: BoardResponse[];
  retriveBoards: () => Promise<void>;
};

export const BoardContext = createContext({} as BoardContextProps);

export const BoardProvider = ({children}: any) => {
  const {retriveBoard} = apis();
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<BoardResponse[]>([]);

  useEffect(() => {
    retriveBoards();
  }, []);

  const retriveBoards = async () => {
    setLoading(true);
    try {
      const response = await retriveBoard.get<BoardResponseCollection>('');
      setCollection(response.data.collections);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return <BoardContext.Provider value={{retriveBoards, collection, loading}}>{children}</BoardContext.Provider>;
};
