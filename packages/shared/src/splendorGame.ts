import type { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

type Player = {
  name: string;
  score: number;
};
type GameType = {
  players: Record<string, Player>;
};
export type SplendorGameCardType = {
  name: string;
  frameX: number;
  frameY: number;
  color: SplendorGameGemName;
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
export type SplendorGameCardName = keyof typeof splendorGameCardList;
export const splendorGameCardList = {
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
    cost: { black: 0, white: 1, red: 0, blue: 3, green: 0 },
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
    frameY: 0,
    color: "black",
    point: 1,
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
    frameX: 3,
    frameY: 0,
    color: "blue",
    point: 3,
    cost: { black: 5, white: 3, red: 3, blue: 0, green: 3 },
    level: 3,
  },
  blue16: {
    name: "blue16",
    frameX: 3,
    frameY: 0,
    color: "blue",
    point: 4,
    cost: { black: 0, white: 7, red: 0, blue: 0, green: 0 },
    level: 3,
  },
  blue17: {
    name: "blue17",
    frameX: 4,
    frameY: 0,
    color: "blue",
    point: 4,
    cost: { black: 3, white: 6, red: 0, blue: 3, green: 0 },
    level: 3,
  },
  blue18: {
    name: "blue18",
    frameX: 4,
    frameY: 0,
    color: "blue",
    point: 5,
    cost: { black: 0, white: 7, red: 0, blue: 3, green: 0 },
    level: 3,
  },
} satisfies Record<string, SplendorGameCardType>;
export type SplendorGameGemType = {
  name: string;
  frameX: number;
  frameY: number;
};

export type SplendorGameGemName = keyof typeof splendorGameGemList;
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

export const splendorGame: Game<GameType> = {
  name: "splendorMonorepo",
  setup: (data) => {
    const { ctx } = data;
    console.log(ctx);
    // 根据人数调整宝石数量
    // let gemCount = 7; // 默认 4人局
    // if (ctx.numPlayers === 2) {
    //   gemCount = 4;
    // } else if (ctx.numPlayers === 3) {
    //   gemCount = 5;
    // }
    const gameData: GameType = {
      players: {},
      // tokens: {
      //   diamond: gemCount,
      //   sapphire: gemCount,
      //   emerald: gemCount,
      //   ruby: gemCount,
      //   onyx: gemCount,
      //   gold: 5, // 金色万能不变
      // },
      // cards: [],
      // nobles: [],
    };
    for (let i = 0; i < ctx.numPlayers; i++) {
      gameData.players[i] = {
        name: ctx.playOrder[i],
        score: 0,
      };
    }
    return gameData;
    // turn: {
    //   minMoves: 1,
    //   maxMoves: 1,
    // },
  },
  moves: {
    clickCell: ({ G, playerID }, id) => {},
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
