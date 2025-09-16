import type { Game } from "boardgame.io";
import _ from "lodash";
import {
  getNewGameData,
  SplendorGameCardName,
  splendorGameCardObj,
  SplendorGameCardType,
  SplendorGameType,
} from "./utils";

export const splendorGame: Game<SplendorGameType> = {
  name: "splendorMonorepo",
  setup: ({ ctx, random }) => {
    const newGameData = getNewGameData(ctx, random);
    return newGameData;
  },
  moves: {
    buyCard: ({ G, ctx }, cardName) => {
      const cardIndex = G.cards.findIndex((item) => item.name === cardName);
      console.log({ cardIndex });

      if (cardIndex === -1) throw new Error(`卡牌不存在！ ${cardName}`);
      const oldCard = G.cards.splice(cardIndex, 1)[0];
      G.players[ctx.currentPlayer].cards.push(oldCard);
    },
    a: ({ G, ctx }) => {},
    gameReset: ({ G, ctx, random }) => {
      const newGameData = getNewGameData(ctx, random);
      return newGameData;
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
