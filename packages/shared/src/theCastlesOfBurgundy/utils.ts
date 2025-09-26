export function takeOne<T>(arr: T[], predicate: (item: T, index: number, array: T[]) => boolean): T | undefined {
  const index = arr.findIndex(predicate);
  if (index !== -1) {
    return arr.splice(index, 1)[0];
  }
  return undefined;
}

export enum StateEnum {
  EMPTY = "EMPTY",
}

export enum DicePointsEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export enum BuildingsColorEnum {
  YELLOW = "修道院",
  BLUE = "船只",
  DARK_GREEN = "城堡",
  GREY = "矿坑",
  GREEN = "牲口",
  BROWN = "建筑物",
  BLACK = "黑市",
}
export enum BuildingsBrownTypeEnum {
  MARKET = "市集",
  CARPENTER = "木匠工厂",
  CHURCH = "教堂",
  WAREHOUSE = "货仓",
  DORMITORY = "宿舍",
  BANK = "银行",
  TOWN_HALL = "大会堂",
  LOOKOUT = "瞭望台",
}
export enum BuildingsGreenTypeEnum {
  GOAT = "山羊",
  SHEEP = "绵羊",
  PIG = "猪",
  COWS = "牛",
}

type BuildingBaseType = {
  isBlack: boolean;
};

export type BuildingsYellowType = BuildingBaseType & {
  color: BuildingsColorEnum.YELLOW;
  yellowType:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26;
};
export type BuildingsBlueType = BuildingBaseType & {
  color: BuildingsColorEnum.BLUE;
};
export type BuildingsDarkGreenType = BuildingBaseType & {
  color: BuildingsColorEnum.DARK_GREEN;
};
export type BuildingsGreyType = BuildingBaseType & {
  color: BuildingsColorEnum.GREY;
};
export type BuildingsGreenType = BuildingBaseType & {
  color: BuildingsColorEnum.GREEN;
  greenType: BuildingsGreenTypeEnum;
  number: 2 | 3 | 4;
};
export type BuildingsBrownType = BuildingBaseType & {
  color: BuildingsColorEnum.BROWN;
  brownType: BuildingsBrownTypeEnum;
};

export type BuildingsType =
  | BuildingsYellowType
  | BuildingsBlueType
  | BuildingsDarkGreenType
  | BuildingsGreyType
  | BuildingsGreenType
  | BuildingsBrownType;

export type BlackMarketType = {
  x: number;
  y: number;
  background: BuildingsColorEnum | StateEnum.EMPTY;
  playNum: number;
  building: BuildingsType | StateEnum.EMPTY;
};

// 货物
export type CargoType = {
  point: DicePointsEnum | StateEnum.EMPTY;
  isBack?: boolean;
};
export type PlayerTerritoryType = Omit<BlackMarketType, "playNum"> & {
  pointNum: DicePointsEnum;
};
export type PlayersInfoType = {
  id: number;
  territory: PlayerTerritoryType[];
  dices?: {
    point: DicePointsEnum;
    isUse: boolean;
  }[];
};
export type WarehouseMarketListType = {
  warehouse: CargoType[];
  market: BlackMarketType[];
};

export type TheCastlesOfBurgundyGameType = {
  // 当前回合
  currentTurn: number;
  // 主板图
  mainBoardInfo: {
    blackMarket: BlackMarketType[];
    warehouseMarketList: WarehouseMarketListType[];
    nowCargos: CargoType[];
    dice: DicePointsEnum | StateEnum.EMPTY;
  };
  // 玩家信息
  playersInfo: PlayersInfoType[];
  // 所有资源标记
  allTokens: {
    cargos: CargoType[];
    buildings: BuildingsType[];
  };
};

const createBuildingsList = <T extends BuildingsType>(length: number, data: T): T[] => {
  return Array.from({ length }, () => ({ ...data }));
};

export const completeTheCastlesOfBurgundyGameInfo: TheCastlesOfBurgundyGameType = {
  currentTurn: 1,
  mainBoardInfo: {
    blackMarket: [
      {
        x: 0,
        y: 0,
        background: BuildingsColorEnum.BLACK,
        playNum: 3,
        building: StateEnum.EMPTY,
      },
      {
        x: 1,
        y: 0,
        background: BuildingsColorEnum.BLACK,
        playNum: 2,
        building: StateEnum.EMPTY,
      },
      {
        x: 2,
        y: 0,
        background: BuildingsColorEnum.BLACK,
        playNum: 4,
        building: StateEnum.EMPTY,
      },
      {
        x: 0,
        y: 1,
        background: BuildingsColorEnum.BLACK,
        playNum: 2,
        building: StateEnum.EMPTY,
      },
      {
        x: 1,
        y: 1,
        background: BuildingsColorEnum.BLACK,
        playNum: 2,
        building: StateEnum.EMPTY,
      },
      {
        x: 0,
        y: 2,
        background: BuildingsColorEnum.BLACK,
        playNum: 4,
        building: StateEnum.EMPTY,
      },
      {
        x: 1,
        y: 2,
        background: BuildingsColorEnum.BLACK,
        playNum: 2,
        building: StateEnum.EMPTY,
      },
      {
        x: 2,
        y: 2,
        background: BuildingsColorEnum.BLACK,
        playNum: 3,
        building: StateEnum.EMPTY,
      },
    ],
    warehouseMarketList: [
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.YELLOW,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.GREEN,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.BROWN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.BLUE,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
        ],
      },
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.YELLOW,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.BROWN,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.DARK_GREEN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.BROWN,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
        ],
      },
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.GREEN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.BLUE,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.BROWN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.GREEN,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
        ],
      },
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.BLUE,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.BROWN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.GREY,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.GREEN,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
        ],
      },
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.BROWN,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.GREY,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.BROWN,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.YELLOW,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
        ],
      },
      {
        warehouse: [],
        market: [
          {
            x: 0,
            y: 0,
            background: BuildingsColorEnum.DARK_GREEN,
            playNum: 3,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 0,
            background: BuildingsColorEnum.BROWN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
          {
            x: 0,
            y: 1,
            background: BuildingsColorEnum.BLUE,
            playNum: 4,
            building: StateEnum.EMPTY,
          },
          {
            x: 1,
            y: 1,
            background: BuildingsColorEnum.GREEN,
            playNum: 2,
            building: StateEnum.EMPTY,
          },
        ],
      },
    ],
    nowCargos: [],
    dice: StateEnum.EMPTY,
  },
  playersInfo: [],
  // 所有资源标记
  allTokens: {
    cargos: Array.from({ length: 42 }, (_, i) => ({ point: Math.floor(i / 7) + 1 })),
    buildings: [
      // 建筑物-普通
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.MARKET,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.CARPENTER,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.CHURCH,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.WAREHOUSE,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.DORMITORY,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.BANK,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.TOWN_HALL,
        isBlack: false,
      }),
      ...createBuildingsList(5, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.LOOKOUT,
        isBlack: false,
      }),
      // 建筑物-黑市
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.MARKET,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.CARPENTER,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.CHURCH,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.WAREHOUSE,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.DORMITORY,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.BANK,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.TOWN_HALL,
        isBlack: true,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.BROWN,
        brownType: BuildingsBrownTypeEnum.LOOKOUT,
        isBlack: true,
      }),
      // 牲口-普通
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.GOAT,
        number: 2,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.GOAT,
        number: 3,
        isBlack: false,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.GOAT,
        number: 4,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.SHEEP,
        number: 2,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.SHEEP,
        number: 3,
        isBlack: false,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.SHEEP,
        number: 4,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.PIG,
        number: 2,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.PIG,
        number: 3,
        isBlack: false,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.PIG,
        number: 4,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.COWS,
        number: 2,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.COWS,
        number: 3,
        isBlack: false,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.COWS,
        number: 4,
        isBlack: false,
      }),
      // 牲口-黑市
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.GOAT,
        number: 3,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.GOAT,
        number: 4,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.SHEEP,
        number: 3,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.SHEEP,
        number: 4,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.PIG,
        number: 3,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.PIG,
        number: 4,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.COWS,
        number: 3,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.COWS,
        number: 4,
        isBlack: true,
      }),
      // 修道院-全部
      ...Array(26)
        .fill(null)
        .map((_, index) => {
          const yellowType = (index + 1) as BuildingsYellowType["yellowType"];
          const isBlack = [7, 12, 14, 15, 24, 25].includes(yellowType);
          return {
            color: BuildingsColorEnum.YELLOW,
            yellowType,
            isBlack,
          } as const;
        }),
      // 城堡-普通
      ...createBuildingsList(14, {
        color: BuildingsColorEnum.DARK_GREEN,
        isBlack: false,
      }),
      // 城堡-黑市
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.DARK_GREEN,
        isBlack: true,
      }),
      // 矿坑-普通
      ...createBuildingsList(10, {
        color: BuildingsColorEnum.GREY,
        isBlack: false,
      }),
      // 矿坑-黑市
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREY,
        isBlack: true,
      }),
      // 船只-普通
      ...createBuildingsList(20, {
        color: BuildingsColorEnum.BLUE,
        isBlack: false,
      }),
      // 船只-黑市
      ...createBuildingsList(6, {
        color: BuildingsColorEnum.BLUE,
        isBlack: true,
      }),
    ],
  },
};
