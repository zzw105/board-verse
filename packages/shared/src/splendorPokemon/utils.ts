import { Ctx } from "boardgame.io";
import { RandomAPI } from "boardgame.io/dist/types/src/plugins/random/random";

// 卡片信息
// type SplendorGameCardCostType = {
//   black: number;
//   white: number;
//   red: number;
//   blue: number;
//   green: number;
// };
// export type SplendorGameCardType = {
//   name: SplendorGameCardName;
//   frameX: number;
//   frameY: number;
//   color: SplendorGameGemNameType;
//   point: number;
//   cost: SplendorGameCardCostType;
//   level: number;
// };
const mergeColors = (item: Partial<Record<SPColorEnum, number>>) => {
  const result: Record<SPColorEnum, number> = {
    [SPColorEnum.Black]: item[SPColorEnum.Black] || 0,
    [SPColorEnum.Blue]: item[SPColorEnum.Blue] || 0,
    [SPColorEnum.Pink]: item[SPColorEnum.Pink] || 0,
    [SPColorEnum.Red]: item[SPColorEnum.Red] || 0,
    [SPColorEnum.Yellow]: item[SPColorEnum.Yellow] || 0,
    [SPColorEnum.Purple]: item[SPColorEnum.Purple] || 0,
  };
  return result;
};
export enum SPColorEnum {
  /** 大师球-紫色 */
  Purple = "purple",
  /** 高级球-黑色 */
  Black = "black",
  /** 治愈球-粉色 */
  Pink = "pink",
  /** 先机球-黄色 */
  Yellow = "yellow",
  /** 精灵球-黄色 */
  Red = "red",
  /** 超级球-蓝色 */
  Blue = "blue",
}
export type SPCardType = {
  /** 卡片ID */
  id: SPCardIdType;
  /** 卡片名称 */
  name: string;
  /** 卡片颜色 */
  color: SPColorEnum;
  /** 卡片抵消资源 */
  offset: Record<SPColorEnum, number>;
  /** 卡片花费资源 */
  cost: Record<SPColorEnum, number>;
  /** 卡片获得积分 */
  point: number;
  /** 卡片等级 */
  level: number;
  /** 卡片进化到的卡片名称 */
  evolvesTo: SPCardIdType[];
  /** 卡片进化到的卡片花费资源 */
  evolvesCost: Record<SPColorEnum, number>;
};

// 生成从 1 到 N 的数字联合类型
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? never
  : Acc["length"] | Enumerate<N, [...Acc, 0]>;

// 生成从 Start 到 End 的数字联合类型
type Range<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>> | Start;

// 1~35 和 1~30 的数字
type Card1Numbers = Range<1, 36>; // 1~35
type Card2Numbers = Range<1, 31>; // 1~30

// 字面量联合类型
export type SPCardIdType = `card-1-${Card1Numbers}` | `card-2-${Card2Numbers}`;

export const SPCardIdList = [
  ...Array.from({ length: 35 }, (_, i) => `card-1-${i + 1}`),
  ...Array.from({ length: 30 }, (_, i) => `card-2-${i + 1}`),
] as const;

// export type SPCardIdType = (typeof SPCardIdList)[number];
export const SPCardObj: Record<SPCardIdType, SPCardType> = {
  "card-1-1": {
    id: "card-1-1",
    name: "迷你龙",
    color: SPColorEnum.Black,
    offset: mergeColors({
      [SPColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SPColorEnum.Yellow]: 3,
      [SPColorEnum.Red]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors({
      [SPColorEnum.Black]: 3,
    }),
    point: 1,
    level: 1,
  },
  "card-1-2": {
    id: "card-1-1",
    name: "迷你龙",
    color: SPColorEnum.Black,
    offset: mergeColors({
      [SPColorEnum.Black]: 1,
    }),
    cost: mergeColors({
      [SPColorEnum.Yellow]: 3,
      [SPColorEnum.Red]: 2,
    }),
    evolvesTo: [],
    evolvesCost: mergeColors({
      [SPColorEnum.Black]: 3,
    }),
    point: 1,
    level: 1,
  },
};

// 宝石信息
export type SplendorGameGemType = {
  name: SplendorGameGemNameType;
  frameX: number;
  frameY: number;
};
export type SplendorGameGemNameType = keyof typeof splendorGameGemList;
export const splendorGameGemList = {
  white: {
    name: "white",
    frameX: 0,
    frameY: 0,
  },
  blue: {
    name: "blue",
    frameX: 1,
    frameY: 0,
  },
  black: {
    name: "black",
    frameX: 2,
    frameY: 0,
  },
  red: {
    name: "red",
    frameX: 3,
    frameY: 0,
  },
  green: {
    name: "green",
    frameX: 4,
    frameY: 0,
  },
} as const;

// 令牌信息
export const tokenNameList = ["green", "white", "blue", "black", "red", "gold"] as const;
export type SplendorGameTokenNameType = (typeof tokenNameList)[number];
export type TokensObjType = Record<SplendorGameTokenNameType, number>;
export type SplendorGameTokenType = {
  name: SplendorGameTokenNameType;
  frameX: number;
  frameY: number;
};
export const splendorGameTokenList: Record<SplendorGameTokenNameType, SplendorGameTokenType> = {
  green: {
    name: "green",
    frameX: 0,
    frameY: 0,
  },
  white: {
    name: "white",
    frameX: 1,
    frameY: 0,
  },
  blue: {
    name: "blue",
    frameX: 2,
    frameY: 0,
  },
  black: {
    name: "black",
    frameX: 3,
    frameY: 0,
  },
  red: {
    name: "red",
    frameX: 4,
    frameY: 0,
  },
  gold: {
    name: "gold",
    frameX: 5,
    frameY: 0,
  },
};

// 贵族信息
export type SplendorGameNobleType = {
  name: SplendorGameNobleNameType;
  frameX: number;
  frameY: number;
  point: number;
  cost: CardPointType;
};
export type SplendorGameNobleNameType = keyof typeof splendorGameNobleObj;
export const splendorGameNobleObj = {
  noble1: {
    name: "noble1",
    frameX: 0,
    frameY: 0,
    point: 3,
    cost: { black: 0, white: 0, red: 4, blue: 0, green: 4 },
  },
  noble2: {
    name: "noble2",
    frameX: 1,
    frameY: 0,
    point: 3,
    cost: { black: 0, white: 0, red: 0, blue: 4, green: 4 },
  },
  noble3: {
    name: "noble3",
    frameX: 2,
    frameY: 0,
    point: 3,
    cost: { black: 0, white: 4, red: 0, blue: 4, green: 0 },
  },
  noble4: {
    name: "noble4",
    frameX: 3,
    frameY: 0,
    point: 3,
    cost: { black: 4, white: 4, red: 0, blue: 0, green: 0 },
  },
  noble5: {
    name: "noble5",
    frameX: 4,
    frameY: 0,
    point: 3,
    cost: { black: 4, white: 0, red: 4, blue: 0, green: 0 },
  },
  noble6: {
    name: "noble6",
    frameX: 0,
    frameY: 1,
    point: 3,
    cost: { black: 3, white: 3, red: 0, blue: 3, green: 0 },
  },
  noble7: {
    name: "noble7",
    frameX: 1,
    frameY: 1,
    point: 3,
    cost: { black: 3, white: 0, red: 3, blue: 0, green: 3 },
  },
  noble8: {
    name: "noble8",
    frameX: 2,
    frameY: 1,
    point: 3,
    cost: { black: 3, white: 3, red: 3, blue: 0, green: 0 },
  },
  noble9: {
    name: "noble9",
    frameX: 3,
    frameY: 1,
    point: 3,
    cost: { black: 0, white: 0, red: 3, blue: 3, green: 3 },
  },
  noble10: {
    name: "noble10",
    frameX: 4,
    frameY: 1,
    point: 3,
    cost: { black: 0, white: 3, red: 0, blue: 3, green: 3 },
  },
} as const;

// 玩家信息
type CardPointType = Record<SplendorGameGemNameType, number>;
export type PlayerType = {
  name: string;
  score: number;
  cardPoint: CardPointType;
  cards: SplendorGameCardType[];
  lockCards: SplendorGameCardType[];
  tokens: TokensObjType;
  nobles: SplendorGameNobleType[];
};

// 游戏信息
export type SplendorGameType = {
  players: Record<string, PlayerType>;
  tokens: TokensObjType;
  cards: SplendorGameCardType[];
  nobles: SplendorGameNobleType[];
};
export const getNewGameData = (ctx: Ctx, random: RandomAPI): SplendorGameType => {
  // 宝石
  // 根据人数调整宝石数量
  let gemCount = 7; // 默认 4人局
  if (ctx.numPlayers === 2) {
    gemCount = 4;
  } else if (ctx.numPlayers === 3) {
    gemCount = 5;
  }

  // 打乱卡牌
  const keys = Object.keys(splendorGameCardObj) as SplendorGameCardName[];
  const disorderKeys = random.Shuffle(keys);
  // 打乱贵族
  const nobleKeys = Object.keys(splendorGameNobleObj) as SplendorGameNobleNameType[];
  const disorderNobleKeys = random.Shuffle(nobleKeys);

  // 全部卡牌
  const splendorGameCardList = disorderKeys.map((key) => splendorGameCardObj[key]) as SplendorGameCardType[];
  // 全部贵族
  const splendorGameNobleList = (
    disorderNobleKeys.map((key) => splendorGameNobleObj[key]) as SplendorGameNobleType[]
  ).splice(0, 4);

  const gameData: SplendorGameType = {
    players: {},
    tokens: {
      red: gemCount,
      blue: gemCount,
      black: gemCount,
      white: gemCount,
      green: gemCount,
      gold: 5, // 金色万能不变
    },
    cards: splendorGameCardList,
    nobles: splendorGameNobleList,
  };
  for (let i = 0; i < ctx.numPlayers; i++) {
    gameData.players[i] = {
      name: ctx.playOrder[i],
      score: 0,
      cards: [],
      lockCards: [],
      nobles: [],
      cardPoint: {
        black: 0,
        blue: 0,
        red: 0,
        green: 0,
        white: 0,
      },
      tokens: {
        red: 0,
        blue: 0,
        black: 0,
        white: 0,
        green: 0,
        gold: 0,
      },
    };
  }

  return gameData;
};

export const getTokenDelta = (player: PlayerType, card: SplendorGameCardType): TokensObjType | null => {
  const cost = card.cost;
  const playerTokens = player.tokens;
  const playerCardPoint = player.cardPoint;
  const delta: TokensObjType = {
    black: 0,
    blue: 0,
    red: 0,
    green: 0,
    white: 0,
    gold: 0,
  };

  let goldNeeded = 0;

  for (const color of Object.keys(cost) as (keyof SplendorGameCardCostType)[]) {
    const required = Math.max(cost[color] - playerCardPoint[color], 0);
    const available = playerTokens[color] || 0;

    if (available >= required) {
      delta[color] = -required;
    } else {
      delta[color] = -available;
      goldNeeded += required - available;
    }
  }

  if (playerTokens.gold >= goldNeeded) {
    delta.gold = -goldNeeded;
    return delta;
  }

  // 金子不足，购买失败
  return null;
};

export const isNobleCost = (player: PlayerType, nobles: SplendorGameNobleType[]): number[] => {
  const canIndexList: number[] = [];

  nobles.forEach((item, index) => {
    const isAllHigher = (Object.keys(player.cardPoint) as Array<keyof typeof player.cardPoint>).every(
      (key) => player.cardPoint[key] >= item.cost[key]
    );
    if (isAllHigher) {
      canIndexList.push(index);
    }
  });

  return canIndexList;
};
