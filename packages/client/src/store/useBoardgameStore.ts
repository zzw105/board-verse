import { LobbyClient } from "boardgame.io/client";
import { Client } from "boardgame.io/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameTypeEnum } from "../enum/game";
import { splendorGame } from "@game/shared";
import { SplendorBoard } from "../components/SplendorBoard/SplendorBoard";
import { SocketIO } from "boardgame.io/multiplayer";

export const lobbyClient = new LobbyClient({
  server: import.meta.env.VITE_API_URL,
});

export const SplendorClient = Client({
  game: splendorGame,
  board: SplendorBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
});

export type GameInfoType = {
  label: GameTypeEnum;
  value: keyof typeof GameTypeEnum;
};
export type SplendorPlayInfoType = {
  playerID: string;
  matchID: string;
};
export type useBoardgameStoreType = {
  splendorPlayInfo?: SplendorPlayInfoType;
  gameList: GameInfoType[];
  setGameList: (newData?: GameInfoType[]) => void;
  setSplendorPlayInfo: (newData: SplendorPlayInfoType) => void;
};

export const useBoardgameStore = create<useBoardgameStoreType>()(
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
      setSplendorPlayInfo: (newData) => {
        set({ splendorPlayInfo: newData });
      },
    }),
    {
      name: "boardgame-storage", // 存储的 key，可以自定义
    }
  )
);
