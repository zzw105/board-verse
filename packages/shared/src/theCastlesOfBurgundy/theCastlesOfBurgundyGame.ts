import type { Ctx, Game } from "boardgame.io";
import { completeTheCastlesOfBurgundyGameInfo, StateEnum, takeOne, TheCastlesOfBurgundyGameType } from "./utils";
import { cloneDeep } from "lodash";

const settingUpCargos = (gameData: TheCastlesOfBurgundyGameType) => {
  const cargos = gameData.allTokens.cargos.splice(0, 5);
  gameData.mainBoardInfo.nowCargos = cargos;
};

const settingUpBuildings = (gameData: TheCastlesOfBurgundyGameType, ctx: Ctx) => {
  gameData.mainBoardInfo.blackMarket.forEach((item) => {
    if (item.playNum > ctx.numPlayers) {
      item.background = StateEnum.EMPTY;
    } else {
      item.building = takeOne(gameData.allTokens.buildings, (building) => building.isBlack === true) ?? StateEnum.EMPTY;
    }
  });
  const warehouseMarketLait = [
    gameData.mainBoardInfo.warehouseMarketOne,
    gameData.mainBoardInfo.warehouseMarketTwo,
    gameData.mainBoardInfo.warehouseMarketThree,
    gameData.mainBoardInfo.warehouseMarketFour,
    gameData.mainBoardInfo.warehouseMarketFive,
    gameData.mainBoardInfo.warehouseMarketSix,
  ];
  warehouseMarketLait.forEach((warehouseMarket) => {
    warehouseMarket.forEach((item) => {
      if (item.playNum > ctx.numPlayers) {
        item.background = StateEnum.EMPTY;
      } else {
        item.building =
          takeOne(
            gameData.allTokens.buildings,
            (building) => building.isBlack === false && item.background === building.color
          ) ?? StateEnum.EMPTY;
      }
    });
  });
  // gameData.mainBoardInfo.warehouseMarketOne.forEach((item) => {
  //   if (item.playNum > ctx.numPlayers) {
  //     item.background = StateEnum.EMPTY;
  //   } else {
  //     item.building = takeOne(gameData.allTokens.buildings, (building) => building.isBlack === false) ?? StateEnum.EMPTY;
  //   }
  // });
};

export const theCastlesOfBurgundyGame: Game<TheCastlesOfBurgundyGameType> = {
  name: "theCastlesOfBurgundyMonorepo",
  setup: ({ ctx, random }) => {
    const newData = cloneDeep(completeTheCastlesOfBurgundyGameInfo);

    // 打乱
    newData.allTokens.cargos = random.Shuffle(newData.allTokens.cargos);
    newData.allTokens.buildings = random.Shuffle(newData.allTokens.buildings);

    // 布置货物
    settingUpCargos(newData);
    settingUpBuildings(newData, ctx);

    return newData;
  },
  phases: {
    play: {
      moves: {},
    },
  },

  endIf: ({ G, ctx }) => {},
};
