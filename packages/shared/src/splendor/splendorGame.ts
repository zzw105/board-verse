import type { Game } from "boardgame.io";
import {
  getNewGameData,
  getTokenDelta,
  SplendorGameTokenNameType,
  SplendorGameType,
  tokenNameList,
  TokensObjType,
} from "./utils";

type SplendorGameMoveType = NonNullable<Game<SplendorGameType>["moves"]>[string];

const buyCard: SplendorGameMoveType = ({ G, ctx, playerID, events }, cardName) => {
  const cardIndex = G.cards.findIndex((item) => item.name === cardName);
  if (cardIndex === -1) throw new Error(`卡牌不存在！ ${cardName}`);
  const nowCard = G.cards.splice(cardIndex, 1)[0];
  const nowUseInfo = G.players[playerID];
  const res = getTokenDelta(nowUseInfo.tokens, nowCard.cost);
  if (!res) {
    throw new Error("没有足够的宝石购买卡牌");
  }
  for (const color of Object.keys(res) as (keyof TokensObjType)[]) {
    nowUseInfo.tokens[color] += res[color];
    G.tokens[color] -= res[color];
  }
  nowUseInfo.cards.push(nowCard);
  events.endTurn();
};

const selectToken: SplendorGameMoveType = ({ G, ctx, events, playerID }, selectTokens: TokensObjType) => {
  tokenNameList.forEach((tokenName) => {
    G.players[playerID].tokens[tokenName] += selectTokens[tokenName];
    G.tokens[tokenName] -= selectTokens[tokenName];
  });
  if (Object.values(G.players[playerID].tokens).reduce((acc, cur) => acc + cur, 0) > 10) {
    events.setStage("discard");
  } else {
    events.endTurn();
  }
};

export const splendorGame: Game<SplendorGameType> = {
  name: "splendorMonorepo",
  setup: ({ ctx, random }) => {
    const newGameData = getNewGameData(ctx, random);
    return newGameData;
  },
  moves: {
    buyCard,
    selectToken,
    gameReset: ({ G, ctx, random }) => {
      const newGameData = getNewGameData(ctx, random);
      return newGameData;
    },
  },
  turn: {
    // order: TurnOrder.DEFAULT,
    stages: {
      // start: {
      //   moves: { buyCard, selectToken },
      // },
      discard: {
        moves: {
          discardToken: ({ G, ctx, playerID, events }, tokenName: SplendorGameTokenNameType) => {
            if (G.players[playerID].tokens[tokenName] > 0) {
              G.players[playerID].tokens[tokenName] -= 1;
              G.tokens[tokenName] += 1;
              if (Object.values(G.players[playerID].tokens).reduce((acc, cur) => acc + cur, 0) <= 10) {
                events.endTurn();
              }
            }
          },
        },
      },
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
