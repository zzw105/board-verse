import type { Game } from "boardgame.io";
import _ from "lodash";

type Player = {
  name: string;
  score: number;
  cards: SplendorGameCardType[];
};
export type SplendorGameType = {
  players: Record<string, Player>;
  tokens: Record<SplendorGameGemNameType, number>;
  cards: {
    level1Card: SplendorGameCardType[];
    level2Card: SplendorGameCardType[];
    level3Card: SplendorGameCardType[];
    showLevel1Card: SplendorGameCardType[];
    showLevel2Card: SplendorGameCardType[];
    showLevel3Card: SplendorGameCardType[];
  };
};
export type SplendorGameCardType = {
  name: SplendorGameCardName;
  frameX: number;
  frameY: number;
  color: SplendorGameGemNameType;
  point: number;
  cost: {
    black: number;
    white: number;
    red: number;
    blue: number;
    green: number;
  };
  level: number;
};
export type SplendorGameCardName = keyof typeof splendorGameCardObj;
export const splendorGameCardObj = {
  black1: {
    name: "black1",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 1, red: 1, blue: 1, green: 1 },
    level: 1,
  },
  black2: {
    name: "black2",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 0, red: 1, blue: 0, green: 2 },
    level: 1,
  },
  black3: {
    name: "black3",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 2, red: 0, blue: 0, green: 2 },
    level: 1,
  },
  black4: {
    name: "black4",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 1, white: 0, red: 3, blue: 0, green: 1 },
    level: 1,
  },
  black5: {
    name: "black5",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 0, red: 0, blue: 0, green: 3 },
    level: 1,
  },
  black6: {
    name: "black6",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 1, red: 1, blue: 2, green: 1 },
    level: 1,
  },
  black7: {
    name: "black7",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 0,
    cost: { black: 0, white: 2, red: 1, blue: 2, green: 0 },
    level: 1,
  },
  black8: {
    name: "black8",
    frameX: 0,
    frameY: 1,
    color: "black",
    point: 1,
    cost: { black: 0, white: 0, red: 0, blue: 4, green: 0 },
    level: 1,
  },
  black9: {
    name: "black9",
    frameX: 1,
    frameY: 1,
    color: "black",
    point: 1,
    cost: { black: 0, white: 3, red: 0, blue: 2, green: 2 },
    level: 2,
  },
  black10: {
    name: "black10",
    frameX: 1,
    frameY: 1,
    color: "black",
    point: 1,
    cost: { black: 2, white: 3, red: 0, blue: 0, green: 3 },
    level: 2,
  },
  black11: {
    name: "black11",
    frameX: 1,
    frameY: 1,
    color: "black",
    point: 2,
    cost: { black: 0, white: 0, red: 2, blue: 1, green: 4 },
    level: 2,
  },
  black12: {
    name: "black12",
    frameX: 2,
    frameY: 1,
    color: "black",
    point: 2,
    cost: { black: 0, white: 5, red: 0, blue: 0, green: 0 },
    level: 2,
  },
  black13: {
    name: "black13",
    frameX: 2,
    frameY: 1,
    color: "black",
    point: 2,
    cost: { black: 0, white: 0, red: 3, blue: 0, green: 5 },
    level: 2,
  },
  black14: {
    name: "black14",
    frameX: 2,
    frameY: 1,
    color: "black",
    point: 3,
    cost: { black: 6, white: 0, red: 0, blue: 0, green: 0 },
    level: 2,
  },
  black15: {
    name: "black15",
    frameX: 4,
    frameY: 1,
    color: "black",
    point: 3,
    cost: { black: 0, white: 3, red: 3, blue: 3, green: 5 },
    level: 3,
  },
  black16: {
    name: "black16",
    frameX: 3,
    frameY: 1,
    color: "black",
    point: 4,
    cost: { black: 0, white: 0, red: 7, blue: 0, green: 0 },
    level: 3,
  },
  black17: {
    name: "black17",
    frameX: 3,
    frameY: 1,
    color: "black",
    point: 4,
    cost: { black: 3, white: 0, red: 6, blue: 0, green: 3 },
    level: 3,
  },
  black18: {
    name: "black18",
    frameX: 4,
    frameY: 1,
    color: "black",
    point: 5,
    cost: { black: 3, white: 0, red: 7, blue: 0, green: 0 },
    level: 3,
  },
  blue1: {
    name: "blue1",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 2, white: 1, red: 0, blue: 0, green: 0 },
    level: 1,
  },
  blue2: {
    name: "blue2",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 1, white: 1, red: 2, blue: 0, green: 1 },
    level: 1,
  },
  blue3: {
    name: "blue3",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 1, white: 1, red: 1, blue: 0, green: 1 },
    level: 1,
  },
  blue4: {
    name: "blue4",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 0, white: 0, red: 1, blue: 1, green: 3 },
    level: 1,
  },
  blue5: {
    name: "blue5",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 3, white: 0, red: 0, blue: 0, green: 0 },
    level: 1,
  },
  blue6: {
    name: "blue6",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 0, white: 1, red: 2, blue: 0, green: 2 },
    level: 1,
  },
  blue7: {
    name: "blue7",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 0,
    cost: { black: 2, white: 0, red: 0, blue: 0, green: 2 },
    level: 1,
  },
  blue8: {
    name: "blue8",
    frameX: 0,
    frameY: 0,
    color: "blue",
    point: 1,
    cost: { black: 0, white: 0, red: 4, blue: 0, green: 0 },
    level: 1,
  },
  blue9: {
    name: "blue9",
    frameX: 2,
    frameY: 0,
    color: "blue",
    point: 1,
    cost: { black: 0, white: 0, red: 3, blue: 2, green: 2 },
    level: 2,
  },
  blue10: {
    name: "blue10",
    frameX: 2,
    frameY: 0,
    color: "blue",
    point: 1,
    cost: { black: 3, white: 0, red: 0, blue: 2, green: 3 },
    level: 2,
  },
  blue11: {
    name: "blue11",
    frameX: 2,
    frameY: 0,
    color: "blue",
    point: 2,
    cost: { black: 0, white: 5, red: 0, blue: 3, green: 0 },
    level: 2,
  },
  blue12: {
    name: "blue12",
    frameX: 1,
    frameY: 0,
    color: "blue",
    point: 2,
    cost: { black: 0, white: 0, red: 0, blue: 5, green: 0 },
    level: 2,
  },
  blue13: {
    name: "blue13",
    frameX: 1,
    frameY: 0,
    color: "blue",
    point: 2,
    cost: { black: 4, white: 2, red: 1, blue: 0, green: 0 },
    level: 2,
  },
  blue14: {
    name: "blue14",
    frameX: 1,
    frameY: 0,
    color: "blue",
    point: 3,
    cost: { black: 0, white: 0, red: 0, blue: 6, green: 0 },
    level: 2,
  },
  blue15: {
    name: "blue15",
    frameX: 4,
    frameY: 0,
    color: "blue",
    point: 3,
    cost: { black: 5, white: 3, red: 3, blue: 0, green: 3 },
    level: 3,
  },
  blue16: {
    name: "blue16",
    frameX: 4,
    frameY: 0,
    color: "blue",
    point: 4,
    cost: { black: 0, white: 7, red: 0, blue: 0, green: 0 },
    level: 3,
  },
  blue17: {
    name: "blue17",
    frameX: 3,
    frameY: 0,
    color: "blue",
    point: 4,
    cost: { black: 3, white: 6, red: 0, blue: 3, green: 0 },
    level: 3,
  },
  blue18: {
    name: "blue18",
    frameX: 3,
    frameY: 0,
    color: "blue",
    point: 5,
    cost: { black: 0, white: 7, red: 0, blue: 3, green: 0 },
    level: 3,
  },
  red1: {
    name: "red1",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 0, white: 3, red: 0, blue: 0, green: 0 },
    level: 1,
  },
  red2: {
    name: "red2",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 3, white: 1, red: 1, blue: 0, green: 0 },
    level: 1,
  },
  red3: {
    name: "red3",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 0, white: 0, red: 0, blue: 2, green: 1 },
    level: 1,
  },
  red4: {
    name: "red4",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 2, white: 2, red: 0, blue: 0, green: 1 },
    level: 1,
  },
  red5: {
    name: "red5",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 1, white: 2, red: 0, blue: 1, green: 1 },
    level: 1,
  },
  red6: {
    name: "red6",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 1, white: 1, red: 0, blue: 1, green: 1 },
    level: 1,
  },
  red7: {
    name: "red7",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 0,
    cost: { black: 0, white: 2, red: 2, blue: 0, green: 0 },
    level: 1,
  },
  red8: {
    name: "red8",
    frameX: 0,
    frameY: 2,
    color: "red",
    point: 1,
    cost: { black: 0, white: 4, red: 0, blue: 0, green: 0 },
    level: 1,
  },
  red9: {
    name: "red9",
    frameX: 2,
    frameY: 2,
    color: "red",
    point: 1,
    cost: { black: 3, white: 0, red: 2, blue: 3, green: 0 },
    level: 2,
  },
  red10: {
    name: "red10",
    frameX: 2,
    frameY: 2,
    color: "red",
    point: 1,
    cost: { black: 3, white: 2, red: 2, blue: 0, green: 0 },
    level: 2,
  },
  red11: {
    name: "red11",
    frameX: 2,
    frameY: 2,
    color: "red",
    point: 2,
    cost: { black: 0, white: 1, red: 0, blue: 4, green: 2 },
    level: 2,
  },
  red12: {
    name: "red12",
    frameX: 1,
    frameY: 2,
    color: "red",
    point: 2,
    cost: { black: 5, white: 3, red: 0, blue: 0, green: 0 },
    level: 2,
  },
  red13: {
    name: "red13",
    frameX: 1,
    frameY: 2,
    color: "red",
    point: 2,
    cost: { black: 5, white: 0, red: 0, blue: 0, green: 0 },
    level: 2,
  },
  red14: {
    name: "red14",
    frameX: 1,
    frameY: 2,
    color: "red",
    point: 3,
    cost: { black: 0, white: 0, red: 6, blue: 0, green: 0 },
    level: 2,
  },
  red15: {
    name: "red15",
    frameX: 4,
    frameY: 2,
    color: "red",
    point: 3,
    cost: { black: 3, white: 3, red: 0, blue: 5, green: 3 },
    level: 3,
  },
  red16: {
    name: "red16",
    frameX: 4,
    frameY: 2,
    color: "red",
    point: 4,
    cost: { black: 0, white: 0, red: 0, blue: 0, green: 7 },
    level: 3,
  },
  red17: {
    name: "red17",
    frameX: 3,
    frameY: 2,
    color: "red",
    point: 4,
    cost: { black: 0, white: 0, red: 3, blue: 3, green: 6 },
    level: 3,
  },
  red18: {
    name: "red18",
    frameX: 3,
    frameY: 2,
    color: "red",
    point: 5,
    cost: { black: 0, white: 0, red: 3, blue: 0, green: 7 },
    level: 3,
  },
  green1: {
    name: "green1",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 0, white: 2, red: 0, blue: 1, green: 0 },
    level: 1,
  },
  green2: {
    name: "green2",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 0, white: 0, red: 2, blue: 2, green: 0 },
    level: 1,
  },
  green3: {
    name: "green3",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 0, white: 1, red: 0, blue: 3, green: 1 },
    level: 1,
  },
  green4: {
    name: "green4",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 1, white: 1, red: 1, blue: 1, green: 0 },
    level: 1,
  },
  green5: {
    name: "green5",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 2, white: 1, red: 1, blue: 1, green: 0 },
    level: 1,
  },
  green6: {
    name: "green6",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 2, white: 0, red: 2, blue: 1, green: 0 },
    level: 1,
  },
  green7: {
    name: "green7",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 0,
    cost: { black: 0, white: 0, red: 3, blue: 0, green: 0 },
    level: 1,
  },
  green8: {
    name: "green8",
    frameX: 0,
    frameY: 3,
    color: "green",
    point: 1,
    cost: { black: 4, white: 0, red: 0, blue: 0, green: 0 },
    level: 1,
  },
  green9: {
    name: "green9",
    frameX: 2,
    frameY: 3,
    color: "green",
    point: 1,
    cost: { black: 0, white: 3, red: 3, blue: 0, green: 2 },
    level: 2,
  },
  green10: {
    name: "green10",
    frameX: 2,
    frameY: 3,
    color: "green",
    point: 1,
    cost: { black: 2, white: 2, red: 0, blue: 3, green: 0 },
    level: 2,
  },
  green11: {
    name: "green11",
    frameX: 2,
    frameY: 3,
    color: "green",
    point: 2,
    cost: { black: 1, white: 4, red: 0, blue: 2, green: 0 },
    level: 2,
  },
  green12: {
    name: "green12",
    frameX: 1,
    frameY: 3,
    color: "green",
    point: 2,
    cost: { black: 0, white: 0, red: 0, blue: 0, green: 5 },
    level: 2,
  },
  green13: {
    name: "green13",
    frameX: 1,
    frameY: 3,
    color: "green",
    point: 2,
    cost: { black: 0, white: 0, red: 0, blue: 5, green: 3 },
    level: 2,
  },
  green14: {
    name: "green14",
    frameX: 1,
    frameY: 3,
    color: "green",
    point: 3,
    cost: { black: 0, white: 0, red: 0, blue: 0, green: 6 },
    level: 2,
  },
  green15: {
    name: "green15",
    frameX: 3,
    frameY: 3,
    color: "green",
    point: 3,
    cost: { black: 3, white: 5, red: 3, blue: 3, green: 0 },
    level: 3,
  },
  green16: {
    name: "green16",
    frameX: 4,
    frameY: 3,
    color: "green",
    point: 4,
    cost: { black: 0, white: 3, red: 0, blue: 6, green: 3 },
    level: 3,
  },
  green17: {
    name: "green17",
    frameX: 4,
    frameY: 3,
    color: "green",
    point: 4,
    cost: { black: 0, white: 0, red: 0, blue: 7, green: 0 },
    level: 3,
  },
  green18: {
    name: "green18",
    frameX: 3,
    frameY: 3,
    color: "green",
    point: 5,
    cost: { black: 0, white: 0, red: 0, blue: 7, green: 3 },
    level: 3,
  },
  white1: {
    name: "white1",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 1, white: 0, red: 0, blue: 2, green: 2 },
    level: 1,
  },
  white2: {
    name: "white2",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 1, white: 0, red: 2, blue: 0, green: 0 },
    level: 1,
  },
  white3: {
    name: "white3",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 1, white: 0, red: 1, blue: 1, green: 1 },
    level: 1,
  },
  white4: {
    name: "white4",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 0, white: 0, red: 0, blue: 3, green: 0 },
    level: 1,
  },
  white5: {
    name: "white5",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 0, white: 0, red: 0, blue: 2, green: 2 },
    level: 1,
  },
  white6: {
    name: "white6",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 1, white: 0, red: 1, blue: 1, green: 2 },
    level: 1,
  },
  white7: {
    name: "white7",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 0,
    cost: { black: 1, white: 3, red: 0, blue: 1, green: 0 },
    level: 1,
  },
  white8: {
    name: "white8",
    frameX: 0,
    frameY: 4,
    color: "white",
    point: 1,
    cost: { black: 0, white: 0, red: 0, blue: 0, green: 4 },
    level: 1,
  },
  white9: {
    name: "white9",
    frameX: 1,
    frameY: 4,
    color: "white",
    point: 1,
    cost: { black: 2, white: 0, red: 2, blue: 0, green: 3 },
    level: 2,
  },
  white10: {
    name: "white10",
    frameX: 1,
    frameY: 4,
    color: "white",
    point: 1,
    cost: { black: 0, white: 2, red: 3, blue: 3, green: 0 },
    level: 2,
  },
  white11: {
    name: "white11",
    frameX: 1,
    frameY: 4,
    color: "white",
    point: 2,
    cost: { black: 2, white: 0, red: 4, blue: 0, green: 1 },
    level: 2,
  },
  white12: {
    name: "white12",
    frameX: 2,
    frameY: 4,
    color: "white",
    point: 2,
    cost: { black: 0, white: 0, red: 5, blue: 0, green: 0 },
    level: 2,
  },
  white13: {
    name: "white13",
    frameX: 2,
    frameY: 4,
    color: "white",
    point: 2,
    cost: { black: 3, white: 0, red: 5, blue: 0, green: 0 },
    level: 2,
  },
  white14: {
    name: "white14",
    frameX: 2,
    frameY: 4,
    color: "white",
    point: 3,
    cost: { black: 0, white: 6, red: 0, blue: 0, green: 0 },
    level: 2,
  },
  white15: {
    name: "white15",
    frameX: 4,
    frameY: 4,
    color: "white",
    point: 3,
    cost: { black: 3, white: 0, red: 5, blue: 3, green: 3 },
    level: 3,
  },
  white16: {
    name: "white16",
    frameX: 3,
    frameY: 4,
    color: "white",
    point: 4,
    cost: { black: 7, white: 0, red: 0, blue: 0, green: 0 },
    level: 3,
  },
  white17: {
    name: "white17",
    frameX: 3,
    frameY: 4,
    color: "white",
    point: 4,
    cost: { black: 6, white: 3, red: 3, blue: 0, green: 0 },
    level: 3,
  },
  white18: {
    name: "white18",
    frameX: 4,
    frameY: 4,
    color: "white",
    point: 5,
    cost: { black: 7, white: 3, red: 0, blue: 0, green: 0 },
    level: 3,
  },
} as const;
export type SplendorGameGemType = {
  name: string;
  frameX: number;
  frameY: number;
};

export type SplendorGameGemNameType = keyof typeof splendorGameGemList | "gold";
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
} satisfies Record<string, SplendorGameGemType>;

export const splendorGame: Game<SplendorGameType> = {
  name: "splendorMonorepo",
  setup: (data) => {
    const { ctx } = data;
    console.log(ctx);
    // 宝石
    // 根据人数调整宝石数量
    let gemCount = 7; // 默认 4人局
    if (ctx.numPlayers === 2) {
      gemCount = 4;
    } else if (ctx.numPlayers === 3) {
      gemCount = 5;
    }
    // 卡牌
    const keys = Object.keys(splendorGameCardObj) as SplendorGameCardName[];
    // 打乱卡牌
    const disorderKeys = _.shuffle(keys);
    // 全部卡牌
    const splendorGameCardList = disorderKeys.map((key) => splendorGameCardObj[key]) as SplendorGameCardType[];
    // 牌堆
    const level1Card = splendorGameCardList.filter((item) => item.level === 1);
    const level2Card = splendorGameCardList.filter((item) => item.level === 2);
    const level3Card = splendorGameCardList.filter((item) => item.level === 3);
    // 展示牌
    const showLevel1Card = level1Card.splice(0, 4);
    const showLevel2Card = level2Card.splice(0, 4);
    const showLevel3Card = level3Card.splice(0, 4);

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
      cards: {
        level1Card,
        level2Card,
        level3Card,
        showLevel1Card,
        showLevel2Card,
        showLevel3Card,
      },
    };
    for (let i = 0; i < ctx.numPlayers; i++) {
      gameData.players[i] = {
        name: ctx.playOrder[i],
        score: 0,
        cards: [],
      };
    }
    return gameData;
    // turn: {
    //   minMoves: 1,
    //   maxMoves: 1,
    // },
  },
  moves: {
    buyCard: ({ G, ctx }, cardName) => {
      const card = [...G.cards.showLevel1Card, ...G.cards.showLevel2Card, ...G.cards.showLevel3Card].find(
        (item) => item.name === cardName
      );
      if (!card) throw new Error(`卡牌不存在！ ${cardName}`);
      const level = card.level;
      if (level === 1) {
        const newCard = G.cards.level1Card.splice(0, 1)[0];
        const index = G.cards.showLevel1Card.findIndex((item) => item.name === cardName);
        G.cards.showLevel1Card[index] = newCard;
        G.players[ctx.currentPlayer].cards.push(card);
      }
    },
  },
  // endIf: ({ G, ctx }) => {
  //   if (IsVictory(G.cells)) {
  //     return { winner: ctx.currentPlayer };
  //   }
  //   if (IsDraw(G.cells)) {
  //     return { draw: true };
  //   }
  // },
};
