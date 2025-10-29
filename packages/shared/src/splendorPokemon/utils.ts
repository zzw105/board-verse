/** 游戏状态 */
export type SP_GameType = {
  playersInfo: SP_PlayerInfoType[];
};

export type SP_PlayerInfoType = {
  /** 玩家ID */
  id: number;
  /** 玩家资源 */
  cards: SP_CardIdType[];
};
/** 合并颜色资源 */
const mergeColors = (item?: Partial<Record<SP_ColorEnum, number>>) => {
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
  level: number;
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
// type Numbers1_30 = Range<1, 31>; // 1~30
type Numbers1_15 = Range<1, 16>; // 1~30

/** 卡片ID类型 */
export type SP_CardIdType = `card_1_${Numbers1_35}` | `card_3_${Numbers1_15}`;

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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Yellow]: 2,
    }),
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
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
    evolvesTo: [],
    evolvesCost: mergeColors({
      [SP_ColorEnum.Pink]: 2,
    }),
    point: 0,
    level: 1,
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
};

export const SP_CardIdList = Object.keys(SP_CardObj) as SP_CardIdType[];

/** 初始化信息 */
export const SP_InitGameData: SP_GameType = {
  playersInfo: [],
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
