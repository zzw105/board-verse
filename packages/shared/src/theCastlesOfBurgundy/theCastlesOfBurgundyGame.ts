import type { Ctx, Game } from "boardgame.io";
import {
  BuildingsColorEnum,
  CargoType,
  completeTheCastlesOfBurgundyGameInfo,
  DicePointsEnum,
  StateEnum,
  takeMany,
  TheCastlesOfBurgundyGameType,
} from "./utils";
import { cloneDeep } from "lodash";
import { playersTerritoryList } from "./playersTerritory";
import { RandomAPI } from "boardgame.io/dist/types/src/plugins/random/random";
import { TurnOrder } from "boardgame.io/core";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";

// 设置货物展示区
const settingUpCargos = (gameData: TheCastlesOfBurgundyGameType) => {
  const cargos = gameData.allTokens.cargos.splice(0, 5);
  gameData.mainBoardInfo.nowCargos = cargos;
  console.log("设置货物展示区完成");
};

// 设置黑市和市场
const settingUpBuildings = (gameData: TheCastlesOfBurgundyGameType, ctx: Ctx) => {
  gameData.mainBoardInfo.blackMarket.forEach((item) => {
    if (item.playNum > ctx.numPlayers) {
      item.background = StateEnum.EMPTY;
    } else {
      item.building =
        takeMany(gameData.allTokens.buildings, 1, (building) => building.isBlack === true)[0] ?? StateEnum.EMPTY;
    }
  });
  console.log("设置黑市完成");
  gameData.mainBoardInfo.warehouseMarketList.forEach((warehouseMarket) => {
    warehouseMarket.market.forEach((item) => {
      if (item.playNum > ctx.numPlayers) {
        item.background = StateEnum.EMPTY;
      } else {
        item.building =
          takeMany(
            gameData.allTokens.buildings,
            1,
            (building) => building.isBlack === false && item.background === building.color
          )[0] ?? StateEnum.EMPTY;
      }
    });
  });
  console.log("设置仓库完成");
};

// 设置玩家和主板图骰子
const settingUpDices = (gameData: TheCastlesOfBurgundyGameType, random: RandomAPI) => {
  gameData.mainBoardInfo.dice = random.D6();
  gameData.playersInfo.forEach((player) => {
    player.dices = Array.from({ length: 2 }, () => ({
      point: random.D6(),
      isUse: false,
    }));
  });
  console.log("设置玩家和主板图骰子完成");
};

// 设置每回合主板
const settingUpMainBoard = (gameData: TheCastlesOfBurgundyGameType) => {
  // 放置当前回合货物
  const index = gameData.mainBoardInfo.nowCargos.findIndex((item) => item.point !== StateEnum.EMPTY);
  if (index === -1) {
    throw new Error("nowCargos 中必须有一个货物的 point 不是 StateEnum.EMPTY");
  }
  const nowCargo = { ...gameData.mainBoardInfo.nowCargos[index] };
  gameData.mainBoardInfo.warehouseMarketList[gameData.mainBoardInfo.dice - 1].warehouse.push(nowCargo);
  gameData.mainBoardInfo.nowCargos[index].point = StateEnum.EMPTY;
  console.log("设置当前回合货物完成");

  // 放置玩家次序token
  if (gameData.playOrder.length === 0) {
    gameData.playOrder = Array.from({ length: 7 }).map((item, index) => {
      if (index === 0) {
        return [0, 1, 2, 3];
      }
      return [];
    });
  }

  // gameData.playOrder = [[0, 1], [], [3], [], [], [], [2]];
};

const settingUpPlayerCoins = (gameData: TheCastlesOfBurgundyGameType, playID: number, dCoins: number) => {
  gameData.playersInfo[playID].coins += dCoins;
};
const settingUpPlayerScore = (gameData: TheCastlesOfBurgundyGameType, playID: number, dScore: number) => {
  gameData.playersInfo[playID].score += dScore;
};
const settingUpPlayerWorkers = (gameData: TheCastlesOfBurgundyGameType, playID: number, dWorkers: number) => {
  gameData.playersInfo[playID].workers += dWorkers;
};
const settingUpPlayerCargos = (gameData: TheCastlesOfBurgundyGameType, playID: number, nowCargos: CargoType[]) => {
  nowCargos.forEach((cargo) => {
    const index = gameData.playersInfo[playID].cargos.findIndex((item) => item[0]?.point === cargo.point);
    if (index !== -1) {
      gameData.playersInfo[playID].cargos[index].push(cargo);
    } else {
      gameData.playersInfo[playID].cargos.push([cargo]);
    }
  });
  // ZZW_TODO: 检查玩家是否有需要丢弃货物
};

const getBuilding = (
  gameData: TheCastlesOfBurgundyGameType,
  events: EventsAPI,
  playID: number,
  buildingId: string,
  dicePoint: DicePointsEnum,
  marketNumber: number,
  workerPoints: number
) => {
  const warehouseMarket = gameData.mainBoardInfo.warehouseMarketList[marketNumber - 1];
  const playerInfo = gameData.playersInfo[playID];

  const manipulatedDice = playerInfo.dices.find((item) => item.isUse === false && item.point === dicePoint);
  if (!manipulatedDice) {
    throw new Error("未使用的骰子中没有与市场点匹配的骰子");
  }

  const buildingIndex = warehouseMarket.market.findIndex(
    (item) => item.building !== StateEnum.EMPTY && item.building.id === buildingId
  );
  const building = warehouseMarket.market[buildingIndex].building;

  if (building !== StateEnum.EMPTY) {
    playerInfo.buildings.push(building);
    manipulatedDice.isUse = true;
    warehouseMarket.market[buildingIndex].building = StateEnum.EMPTY;
    if (workerPoints > 0) settingUpPlayerWorkers(gameData, playID, -workerPoints);
  } else {
    throw new Error("建筑不存在");
  }
};

const getBlackBuilding = (gameData: TheCastlesOfBurgundyGameType, playID: number, buildingId: string) => {
  const playerInfo = gameData.playersInfo[playID];
  if (playerInfo.coins < 2) {
    throw new Error("你需要2个银币才能购买");
  }
  const buildingIndex = gameData.mainBoardInfo.blackMarket.findIndex(
    (item) => item.building !== StateEnum.EMPTY && item.building.id === buildingId
  );
  const building = gameData.mainBoardInfo.blackMarket[buildingIndex].building;

  if (building === StateEnum.EMPTY) {
    throw new Error("建筑不存在");
  }
  playerInfo.coins -= 2;
  playerInfo.buildings.push(building);
  gameData.mainBoardInfo.blackMarket[buildingIndex].building = StateEnum.EMPTY;
  playerInfo.ability.canBuyBlackBuilding = false;
  return building;
};

const getWorkers = (gameData: TheCastlesOfBurgundyGameType, playID: number, dicePoint: DicePointsEnum) => {
  const playerInfo = gameData.playersInfo[playID];
  const manipulatedDice = playerInfo.dices.find((item) => item.isUse === false && item.point === dicePoint);
  if (!manipulatedDice) {
    throw new Error("未找到骰子");
  }
  settingUpPlayerWorkers(gameData, playID, manipulatedDice.point);
  manipulatedDice.isUse = true;
};

const sellCargo = (gameData: TheCastlesOfBurgundyGameType, ctx: Ctx, playID: number, cargoPoint: DicePointsEnum) => {
  const playerInfo = gameData.playersInfo[playID];
  const cargo = takeMany(playerInfo.cargos, 1, (item) => item[0]?.point === cargoPoint)[0];
  const manipulatedDice = playerInfo.dices.find((item) => item.isUse === false && item.point === cargoPoint);
  if (!manipulatedDice) {
    throw new Error("未找到骰子");
  }
  if (!cargo) {
    throw new Error("玩家没有该货物");
  }
  settingUpPlayerScore(gameData, playID, cargo.length * (ctx.numPlayers - 1));
  settingUpPlayerCoins(gameData, playID, 1);
  manipulatedDice.isUse = true;
};

const initPlayerBoard = (gameData: TheCastlesOfBurgundyGameType, ctx: Ctx, random: RandomAPI) => {
  // 初始化玩家起始资源
  gameData.playersInfo = Array.from({ length: ctx.numPlayers }, (_, i) => ({
    id: i,
    territory: playersTerritoryList[random.Die(playersTerritoryList.length) - 1],
    dices: [],
    coins: 0,
    workers: 0,
    cargos: [],
    buildings: [],
    score: 0,
    ability: {
      workerPoints: 1,
      canBuyBlackBuilding: true,
    },
  }));
  gameData.playersInfo.forEach((player, index) => {
    settingUpPlayerCoins(gameData, player.id, 10);
    settingUpPlayerWorkers(gameData, player.id, index + 1);
    const newCargos = takeMany(gameData.allTokens.cargos, 3, (cargo) => cargo.point !== StateEnum.EMPTY);
    settingUpPlayerCargos(gameData, player.id, newCargos);
    const center = player.territory.find((item) => item.center);
    if (center) {
      center.building = takeMany(
        gameData.allTokens.buildings,
        1,
        (item) => item.color === BuildingsColorEnum.DARK_GREEN
      )[0];
    } else {
      throw new Error("玩家 Territory 中必须有一个中心");
    }
  });
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
    // 布置建筑
    settingUpBuildings(newData, ctx);

    // 初始化玩家
    initPlayerBoard(newData, ctx, random);

    settingUpDices(newData, random);

    settingUpMainBoard(newData);
    return newData;
  },
  phases: {
    playerTurn: {
      start: true,
      turn: {
        order: TurnOrder.DEFAULT,
        onBegin: ({ G, ctx }) => {
          const player = G.playersInfo[Number(ctx.currentPlayer)];
          // 玩家回合开始时可以做一些初始化
          console.log(`玩家 ${ctx.currentPlayer} 回合开始`);
        },
        stages: {
          removeBuilding: {
            moves: {
              removeBuilding: (data) => {
                // data.events.setStage("default");
                // 玩家掷骰子
                // const dice = G.mainBoardInfo.dice;
                // console.log(`玩家 ${ctx.currentPlayer} 掷出了 ${dice}`);
                // 这里可以添加掷骰子后的逻辑
              },
            },
          },
        },
      },
      moves: {
        getBuildingMove: (data, buildingId, dicePoint, marketNumber, workerPoints) => {
          getBuilding(
            data.G,
            data.events,
            Number(data.ctx.currentPlayer),
            buildingId,
            dicePoint,
            marketNumber,
            workerPoints
          );
        },
        getBlackBuildingMove: (data, buildingId) => {
          getBlackBuilding(data.G, Number(data.ctx.currentPlayer), buildingId);
        },
        getWorkerMove: (data, dicePoint) => {
          getWorkers(data.G, Number(data.ctx.currentPlayer), dicePoint);
        },
        sellCargoMove: (data, cargoPoint) => {
          sellCargo(data.G, data.ctx, Number(data.ctx.currentPlayer), cargoPoint);
        },
        endPlayerTurn: ({ G, ctx, events }) => {
          // 这里可以做每个玩家回合结束的逻辑
          events.endTurn(); // 自动切换到下一个玩家
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
