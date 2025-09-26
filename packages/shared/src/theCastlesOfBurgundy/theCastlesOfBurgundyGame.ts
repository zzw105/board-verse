import type { Ctx, Game } from "boardgame.io";
import {
  completeTheCastlesOfBurgundyGameInfo,
  DicePointsEnum,
  StateEnum,
  takeOne,
  TheCastlesOfBurgundyGameType,
} from "./utils";
import { cloneDeep } from "lodash";
import { playersTerritoryList } from "./playersTerritory";
import { RandomAPI } from "boardgame.io/dist/types/src/plugins/random/random";

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

  gameData.mainBoardInfo.warehouseMarketList.forEach((warehouseMarket) => {
    warehouseMarket.market.forEach((item) => {
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

const settingUpDices = (gameData: TheCastlesOfBurgundyGameType, random: RandomAPI) => {
  gameData.mainBoardInfo.dice = random.D6();
  gameData.playersInfo.forEach((player) => {
    player.dices = Array.from({ length: 2 }, () => ({
      point: random.D6(),
      isUse: false,
    }));
  });
};

const settingUpMainBoard = (gameData: TheCastlesOfBurgundyGameType) => {};

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

    // 初始化玩家

    newData.playersInfo = Array.from({ length: ctx.numPlayers }, (_, i) => ({
      id: i,
      territory: playersTerritoryList[random.Die(playersTerritoryList.length) - 1],
      dices: [],
    }));
    settingUpDices(newData, random);
    return newData;
  },
  phases: {
    playerTurn: {
      start: true,
      turn: {
        onBegin: ({ G, ctx }) => {
          const player = G.playersInfo[Number(ctx.currentPlayer)];
          // 玩家回合开始时可以做一些初始化
          console.log(`玩家 ${ctx.currentPlayer} 回合开始`);
        },
      },
      moves: {
        endPlayerTurn: (G, ctx) => {
          // 这里可以做每个玩家回合结束的逻辑
          ctx.events.endTurn(); // 自动切换到下一个玩家
        },
      },
      endIf: ({ G, ctx }) => {
        // 检查条件触发 a操作
        // if (/* 条件满足 */) {
        //   console.log("条件满足，执行 a 操作");
        //   // aOperation(G, ctx); // 调用 a 函数
        //   // 重新洗牌玩家顺序
        //   // ctx.playOrder = shuffleArray(ctx.playOrder);
        // }
        return false; // 阶段一直循环，不直接结束
      },
    },
  },
  endIf: ({ G, ctx }) => {},
};
