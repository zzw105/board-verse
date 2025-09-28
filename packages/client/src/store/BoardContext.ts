import { createContext } from "react";

import type { PlayersInfoType, TheCastlesOfBurgundyGameType } from "@game/shared";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

export type BoardContextType = {
  gameData: BoardProps<TheCastlesOfBurgundyGameType>;
  clientPlayerID: number;
  nowPlayingPlayerID: number;
};

export type UserBoardContextType = {
  boardPlayerInfo: PlayersInfoType;
};

export const BoardContext = createContext<BoardContextType>({} as BoardContextType);
export const UserBoardContext = createContext<UserBoardContextType>({} as UserBoardContextType);
