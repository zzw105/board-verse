import type { Game } from "boardgame.io";
import { INVALID_MOVE } from 'boardgame.io/core';

export const splendorGame: Game = {
  name: "splendor-monorepo",
  setup: (data) => {
    const { ctx } = data;
    // 根据人数调整宝石数量
    let gemCount = 7; // 默认 4人局
    if (ctx.numPlayers === 2) {
      gemCount = 4;
    } else if (ctx.numPlayers === 3) {
      gemCount = 5;
    }

    return {
      players: {},
      tokens: {
        diamond: gemCount,
        sapphire: gemCount,
        emerald: gemCount,
        ruby: gemCount,
        onyx: gemCount,
        gold: 5, // 金色万能不变
      },
      cards: [],
      nobles: [],
    };
  },
  minPlayers: 2,
  maxPlayers: 4,

  // turn: {
  //   minMoves: 1,
  //   maxMoves: 1,
  // },

  moves: {
    clickCell: ({ G, playerID }, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = playerID;
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
