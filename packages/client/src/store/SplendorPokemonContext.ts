import { createContext } from "react";

import type { SP_GameType, SP_PlayerInfoType } from "@game/shared";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

export type SP_GameContextType = {
  gameData: BoardProps<SP_GameType>;
  /** 客户端玩家ID */
  clientPlayerID: number;
  /** 客户端玩家信息 */
  clientPlayerInfo: SP_PlayerInfoType;
  /** 当前正在操作的玩家ID */
  nowPlayingPlayerID: number;
  /** 当前正在操作的玩家信息 */
  nowPlayingPlayerInfo: SP_PlayerInfoType;
};

export type SP_UserContextType = {
  boardPlayerInfo: SP_PlayerInfoType;
};

export const SP_GameContext = createContext<SP_GameContextType>({} as SP_GameContextType);
export const SP_UserContextType = createContext<SP_UserContextType>({} as SP_UserContextType);
