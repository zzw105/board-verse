export enum StateEnum {
  EMPTY,
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
};
export type BuildingsBrownType = BuildingBaseType & {
  color: BuildingsColorEnum.BROWN;
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

export type TheCastlesOfBurgundyGameType = {
  // 主板图
  mainBoardInfo: {
    blackMarket: BlackMarketType[];
    warehouseMarketOne: BlackMarketType[];
  };
};

export const completeTheCastlesOfBurgundyGameInfo: TheCastlesOfBurgundyGameType = {
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
  },
};
