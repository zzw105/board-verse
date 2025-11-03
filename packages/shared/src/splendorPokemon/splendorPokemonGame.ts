import type { Ctx, Game } from "boardgame.io";
import {
  getSPTokenDelta,
  mergeColors,
  SP_CardIdList,
  SP_CardIdType,
  SP_CardObj,
  SP_ColorEnum,
  SP_ColorEnumList,
  SP_GameType,
  SP_InitGameData,
  SP_TokenIdList,
  SP_TokenIdType,
  SP_TokenObj,
} from "./utils";
import { cloneDeep } from "lodash";
import { RandomAPI } from "boardgame.io/dist/types/src/plugins/random/random";
import { takeMany } from "../theCastlesOfBurgundy/utils";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/events/events";

/** 初始化玩家信息 */
const initPlayerInfo = (gameData: SP_GameType, ctx: Ctx) => {
  gameData.playersInfo = Array.from({ length: ctx.numPlayers }, (_, i) => ({
    id: i,
    cards: [],
    lockedCards: [],
    tokens: [],
    cardColor: mergeColors(),
    tokenColor: mergeColors(),
    point: 0,
    provisionalTokens: [],
    provisionalCards: [],
  }));
};
/** 初始化令牌卡牌 */
const initTokensCards = (gameData: SP_GameType, ctx: Ctx, setupData?: setupDataType) => {
  // 初始化卡牌
  const isDifferentPictures = setupData?.isDifferentPictures || false;
  const cardBase = ["_1_", "_2_", "_3_"];
  const cardExtra = isDifferentPictures ? ["_8_", "_9_"] : ["_4_", "_5_"];
  const cardPatterns = [...cardBase, ...cardExtra];
  const initCards = SP_CardIdList.filter((card) => cardPatterns.some((k) => card.includes(k)));

  // 初始化令牌
  const purpleTokens = SP_TokenIdList.filter((token) => token.includes("purple"));
  const colorTokens = SP_TokenIdList.filter((token) => !token.includes("purple"));
  const tokenBase = ["_1", "_2", "_3", "_4"];
  if (ctx.numPlayers > 2) tokenBase.push("_5");
  if (ctx.numPlayers > 2) tokenBase.push(...["_6", "_7"]);
  const initTokens = [...purpleTokens, ...colorTokens.filter((token) => tokenBase.some((k) => token.includes(k)))];
  return { initCards, initTokens };
};

/** 初始化游戏板信息 */
const initBoardInfo = (
  gameData: SP_GameType,
  ctx: Ctx,
  random: RandomAPI,
  initCards: SP_CardIdType[],
  initTokens: SP_TokenIdType[]
) => {
  // 随机打乱卡牌
  random.Shuffle(initCards).forEach((card) => {
    const level = SP_CardObj[card].level;
    switch (level) {
      case 1:
        gameData.boardInfo.card.level_1_pile.push(card);
        break;
      case 2:
        gameData.boardInfo.card.level_2_pile.push(card);
        break;
      case 3:
        gameData.boardInfo.card.level_3_pile.push(card);
        break;
      case 4:
        gameData.boardInfo.card.level_4_pile.push(card);
        break;
      case 5:
        gameData.boardInfo.card.level_5_pile.push(card);
        break;
    }
  });
  gameData.boardInfo.card.level_1_show = takeMany(gameData.boardInfo.card.level_1_pile, 4, () => true);
  gameData.boardInfo.card.level_2_show = takeMany(gameData.boardInfo.card.level_2_pile, 4, () => true);
  gameData.boardInfo.card.level_3_show = takeMany(gameData.boardInfo.card.level_3_pile, 4, () => true);
  gameData.boardInfo.card.level_4_show = takeMany(gameData.boardInfo.card.level_4_pile, 1, () => true);
  gameData.boardInfo.card.level_5_show = takeMany(gameData.boardInfo.card.level_5_pile, 1, () => true);
  // 随机打乱令牌
  random.Shuffle(initTokens).forEach((token) => {
    const color = SP_TokenObj[token].color;
    gameData.boardInfo.token[color].push(token);
  });
};

/** 从牌组中获取卡牌 */
const getCard = (gameData: SP_GameType, playerId: number, cardId: SP_CardIdType) => {
  const cardInfo = SP_CardObj[cardId];
  const playerInfo = gameData.playersInfo[playerId];
  const delta = getSPTokenDelta(playerInfo, cardInfo);
  if (!delta) {
    throw new Error("令牌不足");
  }
  SP_ColorEnumList.forEach((color) => {
    const tokens = playerInfo.tokens.slice(0, delta[color]);
    removeTokens(gameData, playerId, tokens);
  });

  const cardPileList = gameData.boardInfo.card[`level_${cardInfo.level}_pile`];
  const cardShowList = gameData.boardInfo.card[`level_${cardInfo.level}_show`];
  cardShowList.forEach((card, index) => {
    if (card === cardId) {
      playerInfo.cards.push(card);
      cardShowList[index] = cardPileList.pop();
    }
  });
  playerInfo.lockedCards.forEach((card, index) => {
    if (card === cardId) {
      playerInfo.cards.push(card);
      playerInfo.lockedCards.splice(index, 1);
    }
  });
};
const lockCard = (gameData: SP_GameType, playerId: number, cardId: SP_CardIdType) => {
  const cardInfo = SP_CardObj[cardId];
  const playerInfo = gameData.playersInfo[playerId];
  const cardPileList = gameData.boardInfo.card[`level_${cardInfo.level}_pile`];
  const cardShowList = gameData.boardInfo.card[`level_${cardInfo.level}_show`];
  cardShowList.forEach((card, index) => {
    if (card === cardId) {
      playerInfo.lockedCards.push(card);
      cardShowList[index] = cardPileList.pop();
    }
  });

  cardPileList.forEach((card, index) => {
    if (card === cardId) {
      playerInfo.lockedCards.push(card);
      cardPileList.splice(index, 1);
    }
  });
};
const colorOrder = ["red", "blue", "black", "pink", "yellow", "purple"];
/** 从牌组中获取令牌 */
const getTokens = (gameData: SP_GameType, playerId: number, tokenIdList: SP_TokenIdType[]) => {
  tokenIdList.forEach((tokenId) => {
    const tokenInfo = SP_TokenObj[tokenId];
    const index = gameData.boardInfo.token[tokenInfo.color].findIndex((token) => token === tokenId);
    if (index === -1) {
      throw new Error("getTokens令牌不存在");
    }
    gameData.boardInfo.token[tokenInfo.color].splice(index, 1);
    gameData.playersInfo[playerId].tokens.push(tokenId);
    gameData.playersInfo[playerId].tokens.sort((a, b) => {
      const colorA = a.split("_")[1];
      const colorB = b.split("_")[1];
      return colorOrder.indexOf(colorA) - colorOrder.indexOf(colorB);
    });
  });
  updatePlayerTokenCount(gameData, playerId);
};
/** 清空玩家临时区 */
const cleanProvisional = (gameData: SP_GameType, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  playerInfo.provisionalCards = [];
  playerInfo.provisionalTokens = [];
};
/** 获取令牌到临时区 */
const provisionalGetToken = (gameData: SP_GameType, playerId: number, tokenId: SP_TokenIdType) => {
  const playerInfo = gameData.playersInfo[playerId];
  playerInfo.provisionalCards = [];
  playerInfo.provisionalTokens.push(tokenId);
  playerInfo.provisionalTokens = [...new Set(playerInfo.provisionalTokens)];
};
/** 获取卡牌到临时区 */
const provisionalGetCard = (gameData: SP_GameType, playerId: number, cardId: SP_CardIdType) => {
  const playerInfo = gameData.playersInfo[playerId];
  playerInfo.provisionalCards = [];
  playerInfo.provisionalTokens = [];
  playerInfo.provisionalCards.push(cardId);
  playerInfo.provisionalCards = [...new Set(playerInfo.provisionalCards)];
};
/** 从临时区牌组中移出令牌 */
const provisionalRemoveToken = (gameData: SP_GameType, playerId: number, tokenId: SP_TokenIdType) => {
  const playerInfo = gameData.playersInfo[playerId];
  const index = playerInfo.provisionalTokens.findIndex((token) => token === tokenId);
  if (index === -1) {
    throw new Error("provisionalRemoveToken令牌不存在");
  }
  playerInfo.provisionalTokens.splice(index, 1);
};

const removeTokens = (gameData: SP_GameType, playerId: number, tokenIds: SP_TokenIdType[]) => {
  const playerInfo = gameData.playersInfo[playerId];
  tokenIds.forEach((tokenId) => {
    const tokenInfo = SP_TokenObj[tokenId];
    const index = playerInfo.tokens.findIndex((token) => token === tokenId);
    if (index === -1) {
      throw new Error("removeTokens令牌不存在");
    }
    playerInfo.tokens.splice(index, 1);
    gameData.boardInfo.token[tokenInfo.color].push(tokenId);
  });
  updatePlayerTokenCount(gameData, playerId);
};

/** 确认选择令牌 */
const prospectiveConfirmationSelectionToken = (gameData: SP_GameType, events: EventsAPI, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  getTokens(gameData, playerId, playerInfo.provisionalTokens);
  playerInfo.provisionalTokens = [];
  if (playerInfo.tokens.length > 10) {
    events.setStage("discard");
  } else {
    endTurn(gameData, events);
  }
};

const prospectiveConfirmationSelectionCard = (gameData: SP_GameType, events: EventsAPI, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  getCard(gameData, playerId, playerInfo.provisionalCards[0]);
  updatePlayerCardCount(gameData, playerId);
  playerInfo.provisionalCards = [];
  endTurn(gameData, events);
};
const prospectiveConfirmationLockCard = (gameData: SP_GameType, events: EventsAPI, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  lockCard(gameData, playerId, playerInfo.provisionalCards[0]);
  playerInfo.provisionalCards = [];
  const purpleToken = gameData.boardInfo.token[SP_ColorEnum.Purple][0];
  if (purpleToken) {
    getTokens(gameData, playerId, [purpleToken]);
  }
  updatePlayerCardCount(gameData, playerId);
  endTurn(gameData, events);
};

/** 更新用户令牌数量 */
const updatePlayerTokenCount = (gameData: SP_GameType, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  playerInfo.tokenColor = {
    [SP_ColorEnum.Red]: 0,
    [SP_ColorEnum.Blue]: 0,
    [SP_ColorEnum.Purple]: 0,
    [SP_ColorEnum.Black]: 0,
    [SP_ColorEnum.Pink]: 0,
    [SP_ColorEnum.Yellow]: 0,
  };
  playerInfo.tokens.forEach((token) => {
    const tokenInfo = SP_TokenObj[token];
    playerInfo.tokenColor[tokenInfo.color]++;
  });
}; /** 更新用户卡牌数量 */
const updatePlayerCardCount = (gameData: SP_GameType, playerId: number) => {
  const playerInfo = gameData.playersInfo[playerId];
  playerInfo.cardColor = {
    [SP_ColorEnum.Red]: 0,
    [SP_ColorEnum.Blue]: 0,
    [SP_ColorEnum.Purple]: 0,
    [SP_ColorEnum.Black]: 0,
    [SP_ColorEnum.Pink]: 0,
    [SP_ColorEnum.Yellow]: 0,
  };
  playerInfo.cards.forEach((card) => {
    const cardInfo = SP_CardObj[card];
    playerInfo.cardColor[cardInfo.color]++;
  });
};
const endTurn = (gameData: SP_GameType, events: EventsAPI) => {
  gameData.playersInfo.forEach((playerInfo) => {
    playerInfo.provisionalCards = [];
    playerInfo.provisionalTokens = [];
  });
  events.endTurn();
};

type setupDataType = {
  isDifferentPictures?: boolean;
};

export const splendorPokemonGame: Game<SP_GameType> = {
  name: "splendorPokemonMonorepo",
  setup: ({ ctx, random }, setupData?: setupDataType) => {
    console.log(setupData);
    const newGameData = cloneDeep(SP_InitGameData);

    const { initCards, initTokens } = initTokensCards(newGameData, ctx, setupData);

    initPlayerInfo(newGameData, ctx);
    initBoardInfo(newGameData, ctx, random, initCards, initTokens);
    return newGameData;
  },
  moves: {
    /** 结束回合 */
    endTurnMove: ({ G, events }) => {
      endTurn(G, events);
    },
    /** 清空玩家临时区 */
    cleanProvisionalMove: (data) => {
      cleanProvisional(data.G, Number(data.ctx.currentPlayer));
    },
    /** 从临时区牌组中获取令牌 */
    provisionalGetTokenMove: (data, tokenId) => {
      provisionalGetToken(data.G, Number(data.ctx.currentPlayer), tokenId);
    },
    /** 从临时区牌组中移出令牌 */
    provisionalRemoveTokenMove: (data, tokenId) => {
      provisionalRemoveToken(data.G, Number(data.ctx.currentPlayer), tokenId);
    },
    /** 获取卡牌到临时区 */
    provisionalGetCardMove: (data, cardId) => {
      provisionalGetCard(data.G, Number(data.ctx.currentPlayer), cardId);
    },
    /** 确认选择令牌 */
    prospectiveConfirmationSelectionTokenMove: (data) => {
      prospectiveConfirmationSelectionToken(data.G, data.events, Number(data.ctx.currentPlayer));
    },
    /** 确认选择卡牌 */
    prospectiveConfirmationSelectionCardMove: (data) => {
      prospectiveConfirmationSelectionCard(data.G, data.events, Number(data.ctx.currentPlayer));
    },
    /** 确认锁定卡牌 */
    prospectiveConfirmationLockCardMove: (data) => {
      prospectiveConfirmationLockCard(data.G, data.events, Number(data.ctx.currentPlayer));
    },

    // test
    // getCardMove: (data, cardId) => {
    //   getCard(data.G, Number(data.ctx.currentPlayer), cardId);
    // },
    // getTokenMove: (data, tokenId) => {
    //   getTokens(data.G, Number(data.ctx.currentPlayer), tokenId);
    // },
  },
  turn: {
    // order: TurnOrder.DEFAULT,
    stages: {
      // start: {
      //   moves: { buyCard, selectToken },
      // },
      discard: {
        moves: {
          removeTokensMove: ({ G, playerID, events }, tokenIds: SP_TokenIdType[]) => {
            removeTokens(G, Number(playerID), tokenIds);
            const playerInfo = G.playersInfo[Number(playerID)];
            if (playerInfo.tokens.length <= 10) {
              endTurn(G, events);
            }
          },
        },
      },
    },
  },

  // endIf: ({ G, ctx }) => {
  //   const index = Object.values(G.players).findIndex((p) => p.score >= 15);
  //   if (index !== -1) {
  //     return index.toString();
  //   }
  // },
};
