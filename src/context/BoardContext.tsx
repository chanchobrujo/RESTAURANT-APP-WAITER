import React, { createContext, useEffect, useState } from "react";

import { apis } from "../api/BoardApi";
import { BoardResponse } from "../model/response/entity/BoardResponse";
import { BoardResponseCollection } from "../model/response/retrive/BoardResponseCollection";

type BoardContextProps = {
  collection: BoardResponse[];
  retriveBoards: () => Promise<void>;
};

export const BoardContext = createContext({} as BoardContextProps);

export const BoardProvider = ({ children }: any) => {
  const { retriveBoard } = apis();
  const [collection, setCollection] = useState<BoardResponse[]>([]);

  useEffect(() => {
    retriveBoards();
  }, []);

  const retriveBoards = async () => {
    try {
      const response = await retriveBoard.get<BoardResponseCollection>("");
      setCollection(response.data.collections);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <BoardContext.Provider value={{ retriveBoards, collection }}>
      {children}
    </BoardContext.Provider>
  );
};
