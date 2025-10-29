import type { Ctx, Game } from "boardgame.io";
import { SP_CardIdList, SP_GameType, SP_InitGameData } from "./utils";
import { cloneDeep } from "lodash";

/** 初始化玩家信息 */
const initPlayerInfo = (gameData: SP_GameType, ctx: Ctx) => {
  gameData.playersInfo = Array.from({ length: ctx.numPlayers }, (_, i) => ({
    id: i,
    // cards: [SP_CardIdList[i]],
    cards: [],
  }));
};

export const splendorPokemonGame: Game<SP_GameType> = {
  name: "splendorPokemonMonorepo",
  setup: ({ ctx, random }, setupData) => {
    console.log(setupData);

    const newGameData = cloneDeep(SP_InitGameData);

    initPlayerInfo(newGameData, ctx);

    return newGameData;
  },
  moves: {},
  turn: {},

  // endIf: ({ G, ctx }) => {
  //   const index = Object.values(G.players).findIndex((p) => p.score >= 15);
  //   if (index !== -1) {
  //     return index.toString();
  //   }
  // },
};
