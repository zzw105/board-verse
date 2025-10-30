import type { Ctx, Game } from "boardgame.io";
import {
  mergeColors,
  SP_CardIdList,
  SP_CardIdType,
  SP_CardObj,
  SP_GameType,
  SP_InitGameData,
  SP_TokenIdList,
  SP_TokenIdType,
  SP_TokenObj,
} from "./utils";
import { cloneDeep } from "lodash";
import { RandomAPI } from "boardgame.io/dist/types/src/plugins/random/random";
import { takeMany } from "../theCastlesOfBurgundy/utils";

/** 初始化玩家信息 */
const initPlayerInfo = (gameData: SP_GameType, ctx: Ctx) => {
  gameData.playersInfo = Array.from({ length: ctx.numPlayers }, (_, i) => ({
    id: i,
    cards: [],
    tokens: [],
    cardColor: mergeColors(),
    tokenColor: mergeColors(),
    point: 0,
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

// 设置每回合主板
const getCard = (gameData: SP_GameType, playerId: number, cardId: SP_CardIdType) => {
  const level = SP_CardObj[cardId].level;
  const playerInfo = gameData.playersInfo[playerId];
  const cardPileList = gameData.boardInfo.card[`level_${level}_pile`];
  const cardShowList = gameData.boardInfo.card[`level_${level}_show`];
  cardShowList.forEach((card, index) => {
    if (card === cardId) {
      playerInfo.cards.push(card);
      cardShowList[index] = cardPileList.pop();
    }
  });
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
    getCardMove: (data, cardId) => {
      getCard(data.G, Number(data.ctx.currentPlayer), cardId);
    },
  },
  turn: {},

  // endIf: ({ G, ctx }) => {
  //   const index = Object.values(G.players).findIndex((p) => p.score >= 15);
  //   if (index !== -1) {
  //     return index.toString();
  //   }
  // },
};
