// import { LobbyClient } from "boardgame.io/client";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { GameTypeEnum } from "../enum/game";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

import { createContext } from "react";

import type { TheCastlesOfBurgundyGameType } from "@game/shared";
export const TheCastlesOfBurgundyGameContext = createContext<BoardProps<TheCastlesOfBurgundyGameType>>(
  {} as BoardProps<TheCastlesOfBurgundyGameType>
);

// export type useTheCastlesOfBurgundyGameStoreType = {
//   gameData?: BoardProps<TheCastlesOfBurgundyGameType>;
// };

// export const useTheCastlesOfBurgundyGameStore = create<useTheCastlesOfBurgundyGameStoreType>()(
//   persist(
//     (set) => ({
//       gameList: [],
//       setGameList: (newData) => {
//         if (newData) {
//           set({ gameList: newData });
//         } else {
//           lobbyClient.listGames().then((games) => {
//             set({
//               gameList: games
//                 .filter((game): game is keyof typeof GameTypeEnum => game in GameTypeEnum)
//                 .map((game) => ({
//                   label: GameTypeEnum[game],
//                   value: game,
//                 })),
//             });
//           });
//         }
//       },
//       setGamePlayInfo: (newData) => {
//         set({ gamePlayInfo: newData });
//       },
//     }),
//     {
//       name: "game-storage", // 存储的 key，可以自定义
//     }
//   )
// );
