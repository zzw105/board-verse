import type { Game } from "boardgame.io";
import { completeTheCastlesOfBurgundyGameInfo, StateEnum, TheCastlesOfBurgundyGameType } from "./utils";
import { cloneDeep } from "lodash";

export const theCastlesOfBurgundyGame: Game<TheCastlesOfBurgundyGameType> = {
  name: "theCastlesOfBurgundyMonorepo",
  setup: ({ ctx, random }) => {
    const newData = cloneDeep(completeTheCastlesOfBurgundyGameInfo);

    // newData.mainBoardInfo.blackMarket.forEach((item) => {
    //   if (item.playNum > ctx.numPlayers) {
    //     item.background = StateEnum.EMPTY;
    //   }
    // });
    return newData;
  },
  phases: {
    play: {
      moves: {},
    },
  },

  endIf: ({ G, ctx }) => {},
};
