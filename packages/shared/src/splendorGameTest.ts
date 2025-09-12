import type { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

type Player = {
  name: string;
  score: number;
};
type GameType = {
  players: Record<string, Player>;
};

export const splendorGameTest: Game<GameType> = {
  name: "splendorMonorepoTest",
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
