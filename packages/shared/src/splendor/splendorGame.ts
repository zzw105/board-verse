import type { Game } from "boardgame.io";
import {
  getNewGameData,
  getTokenDelta,
  isNobleCost,
  SplendorGameCardType,
  SplendorGameNobleType,
  SplendorGameTokenNameType,
  SplendorGameType,
  tokenNameList,
  TokensObjType,
} from "./utils";

type SplendorGameMoveType = NonNullable<Game<SplendorGameType>["moves"]>[string];

const buyCard: SplendorGameMoveType = ({ G, ctx, playerID, events }, cardName) => {
  const cardIndex = G.cards.findIndex((item) => item.name === cardName);
  const nowUseInfo = G.players[playerID];
  const lockCardIndex = nowUseInfo.lockCards.findIndex((item) => item.name === cardName);
  let nowCard: SplendorGameCardType;
  if (cardIndex !== -1) {
    // 卡牌在卡牌库购买
    nowCard = G.cards.splice(cardIndex, 1)[0];
  } else if (lockCardIndex !== -1) {
    // 卡牌在玩家锁卡购买
    nowCard = nowUseInfo.lockCards.splice(lockCardIndex, 1)[0];
  } else {
    throw new Error(`卡牌不存在！ ${cardName}`);
  }
  const res = getTokenDelta(nowUseInfo, nowCard);
  if (!res) {
    throw new Error("没有足够的宝石购买卡牌");
  }
  for (const color of Object.keys(res) as (keyof TokensObjType)[]) {
    nowUseInfo.tokens[color] += res[color];
    G.tokens[color] -= res[color];
  }
  nowUseInfo.cards.push(nowCard);
  nowUseInfo.cardPoint[nowCard.color] += 1;
  nowUseInfo.score += nowCard.point;

  const canNobleIndexList = isNobleCost(G.players[playerID], G.nobles);

  if (canNobleIndexList.length > 0) {
    // 存放目标元素
    const targetElements: SplendorGameNobleType[] = [];

    // 存放剩余元素
    const remainingElements: SplendorGameNobleType[] = [];

    // 遍历原数组
    G.nobles.forEach((item, index) => {
      if (canNobleIndexList.includes(index)) {
        targetElements.push(item); // 目标元素
        nowUseInfo.score += item.point;
      } else {
        remainingElements.push(item); // 剩余元素
      }
    });

    G.nobles = remainingElements;
    G.players[playerID].nobles.push(...targetElements);
  }
  events.endTurn();
};

const lockCard: SplendorGameMoveType = ({ G, ctx, playerID, events }, cardName) => {
  const cardIndex = G.cards.findIndex((item) => item.name === cardName);
  if (cardIndex === -1) throw new Error(`卡牌不存在！ ${cardName}`);
  const nowCard = G.cards.splice(cardIndex, 1)[0];
  const nowUseInfo = G.players[playerID];
  if (nowUseInfo.lockCards.length >= 3) {
    throw new Error("卡牌达到上限");
  }
  nowUseInfo.lockCards.push(nowCard);
  if (G.tokens.gold > 0) {
    G.tokens.gold -= 1;
    nowUseInfo.tokens.gold += 1;
  }

  if (Object.values(G.players[playerID].tokens).reduce((acc, cur) => acc + cur, 0) > 10) {
    events.setStage("discard");
  } else {
    events.endTurn();
  }
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
    lockCard,
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
  // 结束条件
  // endIf: (G, ctx) => {
  //   // 返回一个字符串或对象表示游戏结束
  //   // 返回 undefined 或 null 表示游戏继续
  //   if (G.players.every(p => p >= 10)) {
  //     return '所有玩家分数达到 10，游戏结束';
  //   }
  // },
  endIf: ({ G, ctx }) => {
    const index = Object.values(G.players).findIndex((p) => p.score >= 15);
    if (index !== -1) {
      return index.toString();
    }
  },
};
