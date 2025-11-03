/** 游戏状态 */
export type SP_GameType = {
  /** 所有卡牌资源 */
  // allCards: SP_CardIdType[];
  /** 所有令牌资源 */
  // allTokens: SP_TokenIdType[];
  /** 玩家信息 */
  playersInfo: SP_PlayerInfoType[];
  /** 游戏板信息 */
  boardInfo: SP_BoardInfoType;
};
/** 游戏板信息 */
export type SP_BoardInfoType = {
  /** 卡牌信息 */
  card: {
    /** 一级卡牌堆 */
    level_1_pile: SP_CardIdType[];
    /** 一级卡牌展示 */
    level_1_show: (SP_CardIdType | undefined)[];
    /** 二级卡牌堆 */
    level_2_pile: SP_CardIdType[];
    /** 二级卡牌展示 */
    level_2_show: (SP_CardIdType | undefined)[];
    /** 三级卡牌堆 */
    level_3_pile: SP_CardIdType[];
    /** 三级卡牌展示 */
    level_3_show: (SP_CardIdType | undefined)[];
    /** 四级卡牌堆 */
    level_4_pile: SP_CardIdType[];
    /** 四级卡牌展示 */
    level_4_show: (SP_CardIdType | undefined)[];
    /** 五级卡牌堆 */
    level_5_pile: SP_CardIdType[];
    /** 五级卡牌展示 */
    level_5_show: (SP_CardIdType | undefined)[];
  };
  /** 令牌信息 */
  token: Record<SP_ColorEnum, SP_TokenIdType[]>;
};
/** 玩家信息 */
export type SP_PlayerInfoType = {
  /** 玩家ID */
  id: number;
  /** 玩家卡牌资源 */
  cards: SP_CardIdType[];
  /** 玩家锁定卡牌资源 */
  lockedCards: SP_CardIdType[];
  /** 玩家令牌 */
  tokens: SP_TokenIdType[];
  /** 玩家卡牌颜色资源 */
  cardColor: Record<SP_ColorEnum, number>;
  /** 玩家令牌颜色资源 */
  tokenColor: Record<SP_ColorEnum, number>;
  /** 玩家积分 */
  point: number;
  /** 玩家临时选择tokens */
  provisionalTokens: SP_TokenIdType[];
  /** 玩家临时选择卡牌 */
  provisionalCards: SP_CardIdType[];
};
/** 合并颜色资源 */
export const mergeColors = (item?: Partial<Record<SP_ColorEnum, number>>) => {
  const result: Record<SP_ColorEnum, number> = {
    [SP_ColorEnum.Black]: item?.[SP_ColorEnum.Black] || 0,
    [SP_ColorEnum.Blue]: item?.[SP_ColorEnum.Blue] || 0,
    [SP_ColorEnum.Pink]: item?.[SP_ColorEnum.Pink] || 0,
    [SP_ColorEnum.Red]: item?.[SP_ColorEnum.Red] || 0,
    [SP_ColorEnum.Yellow]: item?.[SP_ColorEnum.Yellow] || 0,
    [SP_ColorEnum.Purple]: item?.[SP_ColorEnum.Purple] || 0,
  };
  return result;
};
/** 颜色枚举 */
export enum SP_ColorEnum {
  /** 大师球-紫色 */
  Purple = "purple",
  /** 高级球-黑色 */
  Black = "black",
  /** 治愈球-粉色 */
  Pink = "pink",
  /** 先机球-黄色 */
  Yellow = "yellow",
  /** 精灵球-红色 */
  Red = "red",
  /** 超级球-蓝色 */
  Blue = "blue",
}
export const SP_ColorEnumList = [
  SP_ColorEnum.Red,
  SP_ColorEnum.Blue,
  SP_ColorEnum.Black,
  SP_ColorEnum.Pink,
  SP_ColorEnum.Yellow,
  SP_ColorEnum.Purple,
];
/** 卡片信息 */
export type SP_CardType = {
  /** 卡片ID */
  id: SP_CardIdType;
  /** 卡片名称 */
  name: string;
  /** 卡片颜色 */
  color: SP_ColorEnum;
  /** 卡片抵消资源 */
  offset: Record<SP_ColorEnum, number>;
  /** 卡片花费资源 */
  cost: Record<SP_ColorEnum, number>;
  /** 卡片获得积分 */
  point: number;
  /** 卡片等级 */
  level: 1 | 2 | 3 | 4 | 5;
  /** 卡片进化到的卡片名称 */
  evolvesTo: SP_CardIdType[];
  /** 卡片进化到的卡片花费资源 */
  evolvesCost: Record<SP_ColorEnum, number>;
};

// 生成从 1 到 N 的数字联合类型
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? never
  : Acc["length"] | Enumerate<N, [...Acc, 0]>;

// 生成从 Start 到 End 的数字联合类型
type Range<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>> | Start;

// 1~35 和 1~30 的数字
type Numbers1_35 = Range<1, 36>; // 1~35
type Numbers1_30 = Range<1, 31>; // 1~30
type Numbers1_15 = Range<1, 16>; // 1~15
type Numbers1_5 = Range<1, 6>; // 1~5
type Numbers1_7 = Range<1, 8>; // 1~7

/** 卡片ID类型 */
export type SP_CardIdType =
  | `card_1_${Numbers1_35}`
  | `card_2_${Numbers1_30}`
  | `card_3_${Numbers1_15}`
  | `card_4_${Numbers1_5}`
  | `card_5_${Numbers1_5}`
  | `card_8_${Numbers1_5}`
  | `card_9_${Numbers1_5}`;

/** 卡片对象 */
export const SP_CardObj: Record<SP_CardIdType, SP_CardType> = {
  card_1_1: {
    id: "card_1_1",
    name: "迷你龙",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_2_1", "card_2_2"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_2: {
    id: "card_1_2",
    name: "迷你龙",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 4,
    }),
    evolvesTo: ["card_2_1", "card_2_2"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_3: {
    id: "card_1_3",
    name: "独角虫",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 1,
      [SP_ColorEnum.Yellow]: 1,
      [SP_ColorEnum.Pink]: 1,
      [SP_ColorEnum.Blue]: 1,
    }),
    evolvesTo: ["card_2_3", "card_2_4"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_4: {
    id: "card_1_4",
    name: "独角虫",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Red]: 1,
      [SP_ColorEnum.Pink]: 1,
    }),
    evolvesTo: ["card_2_3", "card_2_4"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_5: {
    id: "card_1_5",
    name: "走路草",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_2_5", "card_2_6"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_6: {
    id: "card_1_6",
    name: "走路草",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Red]: 1,
    }),
    evolvesTo: ["card_2_5", "card_2_6"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_7: {
    id: "card_1_7",
    name: "走路草",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    evolvesTo: ["card_2_5", "card_2_6"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_8: {
    id: "card_1_8",
    name: "妙蛙种子",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_2_7", "card_2_8"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_9: {
    id: "card_1_9",
    name: "妙蛙种子",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
    }),
    evolvesTo: ["card_2_7", "card_2_8"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_10: {
    id: "card_1_10",
    name: "鬼斯",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 1,
      [SP_ColorEnum.Red]: 1,
      [SP_ColorEnum.Pink]: 1,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_9", "card_2_10"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_11: {
    id: "card_1_11",
    name: "鬼斯",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Black]: 1,
      [SP_ColorEnum.Red]: 1,
    }),
    evolvesTo: ["card_2_9", "card_2_10"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_12: {
    id: "card_1_12",
    name: "尼多兰",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: ["card_2_11", "card_2_12"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_13: {
    id: "card_1_13",
    name: "尼多兰",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 2,
      [SP_ColorEnum.Pink]: 1,
    }),
    evolvesTo: ["card_2_11", "card_2_12"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_14: {
    id: "card_1_14",
    name: "尼多兰",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: ["card_2_11", "card_2_12"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_15: {
    id: "card_1_15",
    name: "小火龙",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: ["card_2_13", "card_2_14"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_16: {
    id: "card_1_16",
    name: "小火龙",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
    }),
    evolvesTo: ["card_2_13", "card_2_14"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_17: {
    id: "card_1_17",
    name: "小拳石",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 1,
      [SP_ColorEnum.Yellow]: 1,
      [SP_ColorEnum.Pink]: 1,
      [SP_ColorEnum.Red]: 1,
    }),
    evolvesTo: ["card_2_15", "card_2_16"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_18: {
    id: "card_1_18",
    name: "小拳石",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 2,
      [SP_ColorEnum.Yellow]: 1,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_15", "card_2_16"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_19: {
    id: "card_1_19",
    name: "波波",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_2_17", "card_2_18"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_20: {
    id: "card_1_20",
    name: "波波",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_17", "card_2_18"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_21: {
    id: "card_1_21",
    name: "波波",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    evolvesTo: ["card_2_17", "card_2_18"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_22: {
    id: "card_1_22",
    name: "凯西",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: ["card_2_19", "card_2_20"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_23: {
    id: "card_1_23",
    name: "凯西",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
    }),
    evolvesTo: ["card_2_19", "card_2_20"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_24: {
    id: "card_1_24",
    name: "绿毛虫",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 1,
      [SP_ColorEnum.Yellow]: 1,
      [SP_ColorEnum.Red]: 1,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_21", "card_2_22"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_25: {
    id: "card_1_25",
    name: "绿毛虫",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Blue]: 1,
      [SP_ColorEnum.Yellow]: 1,
    }),
    evolvesTo: ["card_2_21", "card_2_22"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_26: {
    id: "card_1_26",
    name: "蚊香蝌蚪",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_2_23", "card_2_24"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_27: {
    id: "card_1_27",
    name: "蚊香蝌蚪",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Yellow]: 1,
    }),
    evolvesTo: ["card_2_23", "card_2_24"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_28: {
    id: "card_1_28",
    name: "蚊香蝌蚪",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    evolvesTo: ["card_2_23", "card_2_24"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_29: {
    id: "card_1_29",
    name: "杰尼龟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Blue]: 2,
    }),
    evolvesTo: ["card_2_25", "card_2_26"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_30: {
    id: "card_1_30",
    name: "杰尼龟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 4,
    }),
    evolvesTo: ["card_2_25", "card_2_26"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 1,
    level: 1,
  },
  card_1_31: {
    id: "card_1_31",
    name: "腕力",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 1,
      [SP_ColorEnum.Yellow]: 1,
      [SP_ColorEnum.Pink]: 1,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_27", "card_2_28"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_32: {
    id: "card_1_32",
    name: "腕力",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Pink]: 1,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_2_27", "card_2_28"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 0,
    level: 1,
  },
  card_1_33: {
    id: "card_1_33",
    name: "喇叭芽",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_2_29", "card_2_30"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_34: {
    id: "card_1_34",
    name: "喇叭芽",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Blue]: 1,
    }),
    evolvesTo: ["card_2_29", "card_2_30"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_1_35: {
    id: "card_1_35",
    name: "喇叭芽",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    evolvesTo: ["card_2_29", "card_2_30"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    point: 0,
    level: 1,
  },
  card_2_1: {
    id: "card_2_1",
    name: "哈克龙",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
      [SP_ColorEnum.Pink]: 4,
      [SP_ColorEnum.Yellow]: 1,
    }),
    evolvesTo: ["card_3_1"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_2: {
    id: "card_2_2",
    name: "哈克龙",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 6,
    }),
    evolvesTo: ["card_3_1"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_3: {
    id: "card_2_3",
    name: "铁壳蛹",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 4,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Pink]: 1,
    }),
    evolvesTo: ["card_3_2"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_4: {
    id: "card_2_4",
    name: "铁壳蛹",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 5,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: ["card_3_2"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_5: {
    id: "card_2_5",
    name: "臭臭花",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_3_3"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_6: {
    id: "card_2_6",
    name: "臭臭花",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_3_3"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_7: {
    id: "card_2_7",
    name: "妙蛙草",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 4,
      [SP_ColorEnum.Pink]: 4,
      [SP_ColorEnum.Blue]: 1,
    }),
    evolvesTo: ["card_3_4"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_8: {
    id: "card_2_8",
    name: "妙蛙草",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 6,
    }),
    evolvesTo: ["card_3_4"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_9: {
    id: "card_2_9",
    name: "鬼斯通",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 4,
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Red]: 1,
    }),
    evolvesTo: ["card_3_5"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_10: {
    id: "card_2_10",
    name: "鬼斯通",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 5,
      [SP_ColorEnum.Blue]: 2,
    }),
    evolvesTo: ["card_3_5"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_11: {
    id: "card_2_11",
    name: "尼多娜",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_3_6"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_12: {
    id: "card_2_12",
    name: "尼多娜",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_3_6"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_13: {
    id: "card_2_13",
    name: "火恐龙",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
      [SP_ColorEnum.Black]: 4,
      [SP_ColorEnum.Red]: 1,
    }),
    evolvesTo: ["card_3_7"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_14: {
    id: "card_2_14",
    name: "火恐龙",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 6,
    }),
    evolvesTo: ["card_3_7"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_15: {
    id: "card_2_15",
    name: "隆隆岩",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_3_8"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_16: {
    id: "card_2_16",
    name: "隆隆岩",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 5,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_3_8"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_17: {
    id: "card_2_17",
    name: "比比鸟",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: ["card_3_9"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_18: {
    id: "card_2_18",
    name: "比比鸟",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Pink]: 2,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_3_9"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Red]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_19: {
    id: "card_2_19",
    name: "勇吉拉",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 4,
      [SP_ColorEnum.Yellow]: 4,
      [SP_ColorEnum.Black]: 1,
    }),
    evolvesTo: ["card_3_10"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_20: {
    id: "card_2_20",
    name: "勇吉拉",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 6,
    }),
    evolvesTo: ["card_3_10"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_21: {
    id: "card_2_21",
    name: "铁甲蛹",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
      [SP_ColorEnum.Red]: 2,
      [SP_ColorEnum.Yellow]: 1,
    }),
    evolvesTo: ["card_3_11"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_22: {
    id: "card_2_22",
    name: "铁甲蛹",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 5,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_3_11"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Yellow]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_23: {
    id: "card_2_23",
    name: "蚊香君",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: ["card_3_12"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_24: {
    id: "card_2_24",
    name: "蚊香君",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: ["card_3_12"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Black]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_25: {
    id: "card_2_25",
    name: "卡咪龟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 4,
      [SP_ColorEnum.Black]: 4,
      [SP_ColorEnum.Pink]: 1,
    }),
    evolvesTo: ["card_3_13"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_26: {
    id: "card_2_26",
    name: "卡咪龟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 6,
    }),
    evolvesTo: ["card_3_13"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
    }),
    point: 3,
    level: 2,
  },
  card_2_27: {
    id: "card_2_27",
    name: "豪力",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 4,
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Blue]: 1,
    }),
    evolvesTo: ["card_3_14"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_28: {
    id: "card_2_28",
    name: "豪力",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 5,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: ["card_3_14"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Blue]: 3,
    }),
    point: 2,
    level: 2,
  },
  card_2_29: {
    id: "card_2_29",
    name: "口呆花",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: ["card_3_15"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_2_30: {
    id: "card_2_30",
    name: "口呆花",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: ["card_3_15"],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 4,
    }),
    point: 1,
    level: 2,
  },
  card_3_1: {
    id: "card_3_1",
    name: "快龙",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 7,
      [SP_ColorEnum.Blue]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 5,
    level: 3,
  },
  card_3_2: {
    id: "card_3_2",
    name: "大针蜂",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 6,
      [SP_ColorEnum.Yellow]: 4,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 4,
    level: 3,
  },
  card_3_3: {
    id: "card_3_3",
    name: "霸王花",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 5,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 3,
    level: 3,
  },
  card_3_4: {
    id: "card_3_4",
    name: "妙蛙花",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 7,
      [SP_ColorEnum.Pink]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 5,
    level: 3,
  },
  card_3_5: {
    id: "card_3_5",
    name: "耿鬼",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 6,
      [SP_ColorEnum.Blue]: 4,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 4,
    level: 3,
  },
  card_3_6: {
    id: "card_3_6",
    name: "尼多后",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 5,
      [SP_ColorEnum.Red]: 2,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 3,
    level: 3,
  },
  card_3_7: {
    id: "card_3_7",
    name: "喷火龙",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Black]: 7,
      [SP_ColorEnum.Yellow]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 5,
    level: 3,
  },
  card_3_8: {
    id: "card_3_8",
    name: "隆隆岩",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 6,
      [SP_ColorEnum.Red]: 4,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 4,
    level: 3,
  },
  card_3_9: {
    id: "card_3_9",
    name: "大比鸟",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 5,
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 3,
    level: 3,
  },
  card_3_10: {
    id: "card_3_10",
    name: "胡地",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 7,
      [SP_ColorEnum.Red]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 5,
    level: 3,
  },
  card_3_11: {
    id: "card_3_11",
    name: "巴大蝴",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 6,
      [SP_ColorEnum.Black]: 4,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 4,
    level: 3,
  },
  card_3_12: {
    id: "card_3_12",
    name: "蚊香泳士",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Pink]: 5,
      [SP_ColorEnum.Yellow]: 2,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 3,
    level: 3,
  },
  card_3_13: {
    id: "card_3_13",
    name: "水箭龟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Blue]: 7,
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 5,
    level: 3,
  },
  card_3_14: {
    id: "card_3_14",
    name: "怪力",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Yellow]: 6,
      [SP_ColorEnum.Pink]: 4,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 4,
    level: 3,
  },
  card_3_15: {
    id: "card_3_15",
    name: "大食花",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 1,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Red]: 5,
      [SP_ColorEnum.Black]: 2,
      [SP_ColorEnum.Blue]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 3,
    level: 3,
  },
  card_4_1: {
    id: "card_4_1",
    name: "伊布",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_4_2: {
    id: "card_4_2",
    name: "化石翼龙",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_4_3: {
    id: "card_4_3",
    name: "百变怪",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_4_4: {
    id: "card_4_4",
    name: "卡比兽",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_4_5: {
    id: "card_4_5",
    name: "拉普拉斯",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Blue]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_5_1: {
    id: "card_5_1",
    name: "超梦",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Blue]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_5_2: {
    id: "card_5_2",
    name: "急冻鸟",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_5_3: {
    id: "card_5_3",
    name: "梦幻",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Red]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_5_4: {
    id: "card_5_4",
    name: "火焰鸟",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_5_5: {
    id: "card_5_5",
    name: "闪电鸟",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Yellow]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_8_1: {
    id: "card_8_1",
    name: "小刚的大岩蛇",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Red]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_8_2: {
    id: "card_8_2",
    name: "小智的皮卡丘",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Pink]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_8_3: {
    id: "card_8_3",
    name: "火箭队的果然翁",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_8_4: {
    id: "card_8_4",
    name: "小霞的可达鸭",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Black]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_8_5: {
    id: "card_8_5",
    name: "火箭队的喵喵",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Blue]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 0,
    level: 4,
  },
  card_9_1: {
    id: "card_9_1",
    name: "美洛耶塔",
    color: SP_ColorEnum.Black,
    offset: mergeColors({
      [SP_ColorEnum.Black]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Blue]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_9_2: {
    id: "card_9_2",
    name: "捷拉奥拉",
    color: SP_ColorEnum.Yellow,
    offset: mergeColors({
      [SP_ColorEnum.Yellow]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Red]: 3,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_9_3: {
    id: "card_9_3",
    name: "凯路迪欧",
    color: SP_ColorEnum.Blue,
    offset: mergeColors({
      [SP_ColorEnum.Blue]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Red]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_9_4: {
    id: "card_9_4",
    name: "蒂安希",
    color: SP_ColorEnum.Pink,
    offset: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Yellow]: 3,
      [SP_ColorEnum.Black]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
  card_9_5: {
    id: "card_9_5",
    name: "比克提尼",
    color: SP_ColorEnum.Red,
    offset: mergeColors({
      [SP_ColorEnum.Red]: 2,
    }),
    cost: mergeColors({
      [SP_ColorEnum.Purple]: 1,
      [SP_ColorEnum.Pink]: 3,
      [SP_ColorEnum.Blue]: 3,
      [SP_ColorEnum.Yellow]: 3,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors(),
    point: 2,
    level: 5,
  },
};
export const SP_CardIdList = Object.keys(SP_CardObj) as SP_CardIdType[];

/** tokenID类型 */
export type SP_TokenIdType =
  | `token_purple_${Numbers1_5}`
  | `token_black_${Numbers1_7}`
  | `token_pink_${Numbers1_7}`
  | `token_yellow_${Numbers1_7}`
  | `token_red_${Numbers1_7}`
  | `token_blue_${Numbers1_7}`;

/** token信息 */
export type SP_TokenType = {
  /** tokenID */
  id: SP_TokenIdType;
  /** token名称 */
  name: string;
  /** token颜色 */
  color: SP_ColorEnum;
};

/** token对象 */
export const SP_TokenObj: Record<SP_TokenIdType, SP_TokenType> = {
  token_purple_1: {
    id: "token_purple_1",
    name: "大师球",
    color: SP_ColorEnum.Purple,
  },
  token_purple_2: {
    id: "token_purple_2",
    name: "大师球",
    color: SP_ColorEnum.Purple,
  },
  token_purple_3: {
    id: "token_purple_3",
    name: "大师球",
    color: SP_ColorEnum.Purple,
  },
  token_purple_4: {
    id: "token_purple_4",
    name: "大师球",
    color: SP_ColorEnum.Purple,
  },
  token_purple_5: {
    id: "token_purple_5",
    name: "大师球",
    color: SP_ColorEnum.Purple,
  },
  token_black_1: {
    id: "token_black_1",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_2: {
    id: "token_black_2",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_3: {
    id: "token_black_3",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_4: {
    id: "token_black_4",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_5: {
    id: "token_black_5",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_6: {
    id: "token_black_6",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_black_7: {
    id: "token_black_7",
    name: "高级球",
    color: SP_ColorEnum.Black,
  },
  token_pink_1: {
    id: "token_pink_1",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_2: {
    id: "token_pink_2",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_3: {
    id: "token_pink_3",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_4: {
    id: "token_pink_4",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_5: {
    id: "token_pink_5",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_6: {
    id: "token_pink_6",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_pink_7: {
    id: "token_pink_7",
    name: "治愈球",
    color: SP_ColorEnum.Pink,
  },
  token_yellow_1: {
    id: "token_yellow_1",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_2: {
    id: "token_yellow_2",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_3: {
    id: "token_yellow_3",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_4: {
    id: "token_yellow_4",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_5: {
    id: "token_yellow_5",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_6: {
    id: "token_yellow_6",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_yellow_7: {
    id: "token_yellow_7",
    name: "先机球",
    color: SP_ColorEnum.Yellow,
  },
  token_red_1: {
    id: "token_red_1",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_2: {
    id: "token_red_2",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_3: {
    id: "token_red_3",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_4: {
    id: "token_red_4",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_5: {
    id: "token_red_5",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_6: {
    id: "token_red_6",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_red_7: {
    id: "token_red_7",
    name: "精灵球",
    color: SP_ColorEnum.Red,
  },
  token_blue_1: {
    id: "token_blue_1",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_2: {
    id: "token_blue_2",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_3: {
    id: "token_blue_3",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_4: {
    id: "token_blue_4",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_5: {
    id: "token_blue_5",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_6: {
    id: "token_blue_6",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
  token_blue_7: {
    id: "token_blue_7",
    name: "超级球",
    color: SP_ColorEnum.Blue,
  },
};
export const SP_TokenIdList = Object.keys(SP_TokenObj) as SP_TokenIdType[];

/** 初始化信息 */
export const SP_InitGameData: SP_GameType = {
  /** 所有卡牌资源 */
  // allCards: [],
  /** 所有令牌资源 */
  // allTokens: [],
  /** 玩家信息 */
  playersInfo: [],
  /** 游戏板信息 */
  boardInfo: {
    /** 卡牌信息 */
    card: {
      /** 一级卡牌堆 */
      level_1_pile: [],
      /** 一级卡牌展示 */
      level_1_show: [],
      /** 二级卡牌堆 */
      level_2_pile: [],
      /** 二级卡牌展示 */
      level_2_show: [],
      /** 三级卡牌堆 */
      level_3_pile: [],
      /** 三级卡牌展示 */
      level_3_show: [],
      /** 四级卡牌堆 */
      level_4_pile: [],
      /** 四级卡牌展示 */
      level_4_show: [],
      /** 五级卡牌堆 */
      level_5_pile: [],
      /** 五级卡牌展示 */
      level_5_show: [],
    },
    /** 令牌信息 */
    token: {
      [SP_ColorEnum.Purple]: [],
      [SP_ColorEnum.Black]: [],
      [SP_ColorEnum.Pink]: [],
      [SP_ColorEnum.Yellow]: [],
      [SP_ColorEnum.Red]: [],
      [SP_ColorEnum.Blue]: [],
    },
  },
};

// // 宝石信息
// export type SplendorGameGemType = {
//   name: SplendorGameGemNameType;
//   frameX: number;
//   frameY: number;
// };
// export type SplendorGameGemNameType = keyof typeof splendorGameGemList;
// export const splendorGameGemList = {
//   white: {
//     name: "white",
//     frameX: 0,
//     frameY: 0,
//   },
//   blue: {
//     name: "blue",
//     frameX: 1,
//     frameY: 0,
//   },
//   black: {
//     name: "black",
//     frameX: 2,
//     frameY: 0,
//   },
//   red: {
//     name: "red",
//     frameX: 3,
//     frameY: 0,
//   },
//   green: {
//     name: "green",
//     frameX: 4,
//     frameY: 0,
//   },
// } as const;

// // 令牌信息
// export const tokenNameList = ["green", "white", "blue", "black", "red", "gold"] as const;
// export type SplendorGameTokenNameType = (typeof tokenNameList)[number];
// export type TokensObjType = Record<SplendorGameTokenNameType, number>;
// export type SplendorGameTokenType = {
//   name: SplendorGameTokenNameType;
//   frameX: number;
//   frameY: number;
// };
// export const splendorGameTokenList: Record<SplendorGameTokenNameType, SplendorGameTokenType> = {
//   green: {
//     name: "green",
//     frameX: 0,
//     frameY: 0,
//   },
//   white: {
//     name: "white",
//     frameX: 1,
//     frameY: 0,
//   },
//   blue: {
//     name: "blue",
//     frameX: 2,
//     frameY: 0,
//   },
//   black: {
//     name: "black",
//     frameX: 3,
//     frameY: 0,
//   },
//   red: {
//     name: "red",
//     frameX: 4,
//     frameY: 0,
//   },
//   gold: {
//     name: "gold",
//     frameX: 5,
//     frameY: 0,
//   },
// };

// // 贵族信息
// export type SplendorGameNobleType = {
//   name: SplendorGameNobleNameType;
//   frameX: number;
//   frameY: number;
//   point: number;
//   cost: CardPointType;
// };
// export type SplendorGameNobleNameType = keyof typeof splendorGameNobleObj;
// export const splendorGameNobleObj = {
//   noble1: {
//     name: "noble1",
//     frameX: 0,
//     frameY: 0,
//     point: 3,
//     cost: { black: 0, white: 0, red: 4, blue: 0, green: 4 },
//   },
//   noble2: {
//     name: "noble2",
//     frameX: 1,
//     frameY: 0,
//     point: 3,
//     cost: { black: 0, white: 0, red: 0, blue: 4, green: 4 },
//   },
//   noble3: {
//     name: "noble3",
//     frameX: 2,
//     frameY: 0,
//     point: 3,
//     cost: { black: 0, white: 4, red: 0, blue: 4, green: 0 },
//   },
//   noble4: {
//     name: "noble4",
//     frameX: 3,
//     frameY: 0,
//     point: 3,
//     cost: { black: 4, white: 4, red: 0, blue: 0, green: 0 },
//   },
//   noble5: {
//     name: "noble5",
//     frameX: 4,
//     frameY: 0,
//     point: 3,
//     cost: { black: 4, white: 0, red: 4, blue: 0, green: 0 },
//   },
//   noble6: {
//     name: "noble6",
//     frameX: 0,
//     frameY: 1,
//     point: 3,
//     cost: { black: 3, white: 3, red: 0, blue: 3, green: 0 },
//   },
//   noble7: {
//     name: "noble7",
//     frameX: 1,
//     frameY: 1,
//     point: 3,
//     cost: { black: 3, white: 0, red: 3, blue: 0, green: 3 },
//   },
//   noble8: {
//     name: "noble8",
//     frameX: 2,
//     frameY: 1,
//     point: 3,
//     cost: { black: 3, white: 3, red: 3, blue: 0, green: 0 },
//   },
//   noble9: {
//     name: "noble9",
//     frameX: 3,
//     frameY: 1,
//     point: 3,
//     cost: { black: 0, white: 0, red: 3, blue: 3, green: 3 },
//   },
//   noble10: {
//     name: "noble10",
//     frameX: 4,
//     frameY: 1,
//     point: 3,
//     cost: { black: 0, white: 3, red: 0, blue: 3, green: 3 },
//   },
// } as const;

// // 玩家信息
// type CardPointType = Record<SplendorGameGemNameType, number>;
// export type PlayerType = {
//   name: string;
//   score: number;
//   cardPoint: CardPointType;
//   cards: SplendorGameCardType[];
//   lockCards: SplendorGameCardType[];
//   tokens: TokensObjType;
//   nobles: SplendorGameNobleType[];
// };

// // 游戏信息
// export type SplendorGameType = {
//   players: Record<string, PlayerType>;
//   tokens: TokensObjType;
//   cards: SplendorGameCardType[];
//   nobles: SplendorGameNobleType[];
// };
// export const getNewGameData = (ctx: Ctx, random: RandomAPI): SplendorGameType => {
//   // 宝石
//   // 根据人数调整宝石数量
//   let gemCount = 7; // 默认 4人局
//   if (ctx.numPlayers === 2) {
//     gemCount = 4;
//   } else if (ctx.numPlayers === 3) {
//     gemCount = 5;
//   }

//   // 打乱卡牌
//   const keys = Object.keys(splendorGameCardObj) as SplendorGameCardName[];
//   const disorderKeys = random.Shuffle(keys);
//   // 打乱贵族
//   const nobleKeys = Object.keys(splendorGameNobleObj) as SplendorGameNobleNameType[];
//   const disorderNobleKeys = random.Shuffle(nobleKeys);

//   // 全部卡牌
//   const splendorGameCardList = disorderKeys.map((key) => splendorGameCardObj[key]) as SplendorGameCardType[];
//   // 全部贵族
//   const splendorGameNobleList = (
//     disorderNobleKeys.map((key) => splendorGameNobleObj[key]) as SplendorGameNobleType[]
//   ).splice(0, 4);

//   const gameData: SplendorGameType = {
//     players: {},
//     tokens: {
//       red: gemCount,
//       blue: gemCount,
//       black: gemCount,
//       white: gemCount,
//       green: gemCount,
//       gold: 5, // 金色万能不变
//     },
//     cards: splendorGameCardList,
//     nobles: splendorGameNobleList,
//   };
//   for (let i = 0; i < ctx.numPlayers; i++) {
//     gameData.players[i] = {
//       name: ctx.playOrder[i],
//       score: 0,
//       cards: [],
//       lockCards: [],
//       nobles: [],
//       cardPoint: {
//         black: 0,
//         blue: 0,
//         red: 0,
//         green: 0,
//         white: 0,
//       },
//       tokens: {
//         red: 0,
//         blue: 0,
//         black: 0,
//         white: 0,
//         green: 0,
//         gold: 0,
//       },
//     };
//   }

//   return gameData;
// };

// export const getTokenDelta = (player: PlayerType, card: SplendorGameCardType): TokensObjType | null => {
//   const cost = card.cost;
//   const playerTokens = player.tokens;
//   const playerCardPoint = player.cardPoint;
//   const delta: TokensObjType = {
//     black: 0,
//     blue: 0,
//     red: 0,
//     green: 0,
//     white: 0,
//     gold: 0,
//   };

//   let goldNeeded = 0;

//   for (const color of Object.keys(cost) as (keyof SplendorGameCardCostType)[]) {
//     const required = Math.max(cost[color] - playerCardPoint[color], 0);
//     const available = playerTokens[color] || 0;

//     if (available >= required) {
//       delta[color] = -required;
//     } else {
//       delta[color] = -available;
//       goldNeeded += required - available;
//     }
//   }

//   if (playerTokens.gold >= goldNeeded) {
//     delta.gold = -goldNeeded;
//     return delta;
//   }

//   // 金子不足，购买失败
//   return null;
// };

// export const isNobleCost = (player: PlayerType, nobles: SplendorGameNobleType[]): number[] => {
//   const canIndexList: number[] = [];

//   nobles.forEach((item, index) => {
//     const isAllHigher = (Object.keys(player.cardPoint) as Array<keyof typeof player.cardPoint>).every(
//       (key) => player.cardPoint[key] >= item.cost[key]
//     );
//     if (isAllHigher) {
//       canIndexList.push(index);
//     }
//   });

//   return canIndexList;
// };

export const getSPTokenDelta = (player: SP_PlayerInfoType, card: SP_CardType): Record<SP_ColorEnum, number> | null => {
  const cost = card.cost;
  const playerTokens = player.tokenColor;
  const playerCardPoint = player.cardColor;
  const delta: Record<SP_ColorEnum, number> = {
    [SP_ColorEnum.Black]: 0,
    [SP_ColorEnum.Blue]: 0,
    [SP_ColorEnum.Pink]: 0,
    [SP_ColorEnum.Red]: 0,
    [SP_ColorEnum.Yellow]: 0,
    [SP_ColorEnum.Purple]: 0,
  };

  SP_ColorEnumList.forEach((color) => {
    const required = Math.max(cost[color] - playerCardPoint[color], 0);
    const available = playerTokens[color] || 0;
    if (available >= required) {
      delta[color] += required;
    } else {
      delta[color] = available;
      delta[SP_ColorEnum.Purple] += required - available;
    }
  });

  if (SP_ColorEnumList.every((color) => delta[color] <= playerTokens[color])) {
    return delta;
  }

  // 金子不足，购买失败
  return null;
};
