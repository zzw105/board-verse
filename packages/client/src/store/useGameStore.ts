import { LobbyClient } from "boardgame.io/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameTypeEnum } from "../enum/game";

export const lobbyClient = new LobbyClient({
  server: import.meta.env.VITE_API_URL,
});

export type GameInfoType = {
  label: GameTypeEnum;
  value: keyof typeof GameTypeEnum;
};
export type GamePlayInfoType = {
  playerID: string;
  matchID: string;
};
export type useGameStoreType = {
  gamePlayInfo?: GamePlayInfoType;
  gameList: GameInfoType[];
  setGameList: (newData?: GameInfoType[]) => void;
  setGamePlayInfo: (newData: GamePlayInfoType) => void;
};

export const useGameStore = create<useGameStoreType>()(
  persist(
    (set) => ({
      gameList: [],
      setGameList: (newData) => {
        if (newData) {
          set({ gameList: newData });
        } else {
          lobbyClient.listGames().then((games) => {
            set({
              gameList: games
                .filter((game): game is keyof typeof GameTypeEnum => game in GameTypeEnum)
                .map((game) => ({
                  label: GameTypeEnum[game],
                  value: game,
                })),
            });
          });
        }
      },
      setGamePlayInfo: (newData) => {
        set({ gamePlayInfo: newData });
      },
    }),
    {
      name: "game-storage", // 存储的 key，可以自定义
    }
  )
);
