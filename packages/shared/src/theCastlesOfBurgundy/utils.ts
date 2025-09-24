export enum StateEnum {
  EMPTY,
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
  CHICKEN = "鸡",
  SHEEP = "羊",
  PIG = "猪",
  COWS = "牛",
}

type BuildingBaseType = {
  isBlack: boolean;
};

export type BuildingsYellowType = BuildingBaseType & {
  color: BuildingsColorEnum.YELLOW;
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

export type TheCastlesOfBurgundyGameType = {
  // 当前回合
  currentTurn: number;
  // 主板图
  mainBoardInfo: {
    blackMarket: BlackMarketType[];
    warehouseMarketOne: BlackMarketType[];
    warehouseMarketTwo: BlackMarketType[];
    warehouseMarketThree: BlackMarketType[];
    warehouseMarketFour: BlackMarketType[];
    warehouseMarketFive: BlackMarketType[];
    warehouseMarketSix: BlackMarketType[];
    nowCargos: CargoType[];
  };
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
    warehouseMarketOne: [
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
    warehouseMarketTwo: [
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
    warehouseMarketThree: [
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
    warehouseMarketFour: [
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
    warehouseMarketFive: [
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
    warehouseMarketSix: [
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
    nowCargos: [],
  },
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
        greenType: BuildingsGreenTypeEnum.CHICKEN,
        number: 2,
        isBlack: false,
      }),
      ...createBuildingsList(2, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.CHICKEN,
        number: 3,
        isBlack: false,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.CHICKEN,
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
        greenType: BuildingsGreenTypeEnum.CHICKEN,
        number: 3,
        isBlack: true,
      }),
      ...createBuildingsList(1, {
        color: BuildingsColorEnum.GREEN,
        greenType: BuildingsGreenTypeEnum.CHICKEN,
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
     

      // 船只
      ...Array.from({ length: 20 }).map(() => ({ color: BuildingsColorEnum.BLUE, isBlack: false }) as const),
      ...Array.from({ length: 6 }).map(() => ({ color: BuildingsColorEnum.BLUE, isBlack: true }) as const),
    ],
  },
};
