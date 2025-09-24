import type { Game } from "boardgame.io";
import { completeTheCastlesOfBurgundyGameInfo, StateEnum, TheCastlesOfBurgundyGameType } from "./utils";
import { cloneDeep } from "lodash";

const settingUpCargos = (gameData: TheCastlesOfBurgundyGameType) => {
  const cargos = gameData.allTokens.cargos.splice(0, 5);
  gameData.mainBoardInfo.nowCargos = cargos;
};

export const theCastlesOfBurgundyGame: Game<TheCastlesOfBurgundyGameType> = {
  name: "theCastlesOfBurgundyMonorepo",
  setup: ({ ctx, random }) => {
    const newData = cloneDeep(completeTheCastlesOfBurgundyGameInfo);

    // newData.mainBoardInfo.blackMarket.forEach((item) => {
    //   if (item.playNum > ctx.numPlayers) {
    //     item.background = StateEnum.EMPTY;
    //   }
    // });
    // 打乱
    newData.allTokens.cargos = random.Shuffle(newData.allTokens.cargos);

    // 布置货物
    settingUpCargos(newData);

    return newData;
  },
  phases: {
    play: {
      moves: {},
    },
  },

  endIf: ({ G, ctx }) => {},
};
