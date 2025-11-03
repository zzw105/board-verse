import { type SP_CardIdType, SP_CardObj, SP_ColorEnum, type SP_GameType, type SP_TokenIdType } from "@game/shared";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

export type shapesType = {
  id: string;
  x: number;
  y: number;
}[];

export type TokenItemPositionType = {
  x: number;
  y: number;
  isShow: boolean;
  pos: number | "main";
  /** 是否是临时位置 */
  isProvisional: boolean;
};

export type CardsItemPositionType = TokenItemPositionType & {
  /** 是否是正面朝上 */
  isFaceUp: boolean;
  /** 是否是水平放置 */
  isHorizontal: boolean;
};

export type AllItemPositionType = {
  cards: Record<SP_CardIdType, CardsItemPositionType>;
  tokens: Record<SP_TokenIdType, TokenItemPositionType>;
};

export const colorListObj: Record<SP_ColorEnum, number> = {
  [SP_ColorEnum.Red]: 1,
  [SP_ColorEnum.Blue]: 2,
  [SP_ColorEnum.Black]: 3,
  [SP_ColorEnum.Pink]: 4,
  [SP_ColorEnum.Yellow]: 5,
  [SP_ColorEnum.Purple]: 6,
};

/**
 * 设置主板上的牌和令牌的位置
 */
export const setMainBoardTokenCardPos = (
  gameData: BoardProps<SP_GameType>,
  allItemPosition: AllItemPositionType,
  shapes: shapesType,
) => {
  const mainBoard = shapes.find((shape) => shape.id === `MainBoard`)!;
  // 牌堆
  [
    gameData.G.boardInfo.card.level_1_pile,
    gameData.G.boardInfo.card.level_2_pile,
    gameData.G.boardInfo.card.level_3_pile,
  ].forEach((pile, level) => {
    pile.forEach((card) => {
      if (card) {
        const cardPosInfo = allItemPosition.cards[card];
        cardPosInfo.x = mainBoard.x + 20;
        cardPosInfo.y = mainBoard.y + 16 + (2 - level) * 112;
        cardPosInfo.isShow = true;
        cardPosInfo.pos = "main";
        cardPosInfo.isProvisional = false;
        cardPosInfo.isFaceUp = false;
        cardPosInfo.isHorizontal = false;
      }
    });
  });
  // 展示牌
  [
    gameData.G.boardInfo.card.level_1_show,
    gameData.G.boardInfo.card.level_2_show,
    gameData.G.boardInfo.card.level_3_show,
  ].forEach((pile, level) => {
    pile.forEach((card, num) => {
      if (card) {
        const cardPosInfo = allItemPosition.cards[card];
        cardPosInfo.x = mainBoard.x + 20 + 113 + num * 88;
        cardPosInfo.y = mainBoard.y + 16 + (2 - level) * 112;
        cardPosInfo.isShow = true;
        cardPosInfo.pos = "main";
        cardPosInfo.isProvisional = false;
        cardPosInfo.isFaceUp = true;
        cardPosInfo.isHorizontal = false;
      }
    });
  });
  // 45级牌堆
  [gameData.G.boardInfo.card.level_4_pile, gameData.G.boardInfo.card.level_5_pile].forEach((pile, level) => {
    pile.forEach((card) => {
      if (card) {
        const cardPosInfo = allItemPosition.cards[card];
        cardPosInfo.x = mainBoard.x + 507;
        cardPosInfo.y = mainBoard.y + 63 + level * 130;
        cardPosInfo.isShow = true;
        cardPosInfo.pos = "main";
        cardPosInfo.isProvisional = false;
        cardPosInfo.isFaceUp = false;
        cardPosInfo.isHorizontal = false;
      }
    });
  });
  // 45级展示牌
  [gameData.G.boardInfo.card.level_4_show, gameData.G.boardInfo.card.level_5_show].forEach((pile, level) => {
    pile.forEach((card) => {
      if (card) {
        const cardPosInfo = allItemPosition.cards[card];
        cardPosInfo.x = mainBoard.x + 507;
        cardPosInfo.y = mainBoard.y + 63 + level * 130;
        cardPosInfo.isShow = true;
        cardPosInfo.pos = "main";
        cardPosInfo.isProvisional = false;
        cardPosInfo.isFaceUp = true;
        cardPosInfo.isHorizontal = false;
      }
    });
  });

  for (const key in gameData.G.boardInfo.token) {
    const tokenColor = key as SP_ColorEnum;
    if (!Object.hasOwn(gameData.G.boardInfo.token, tokenColor)) continue;
    const tokenColorList = gameData.G.boardInfo.token[tokenColor];
    tokenColorList.forEach((token) => {
      const tokenPosInfo = allItemPosition.tokens[token];
      tokenPosInfo.x = mainBoard.x + 36 + (colorListObj[tokenColor] - 1) * 88;
      if (tokenColor === SP_ColorEnum.Purple) {
        tokenPosInfo.x += 30;
      }
      tokenPosInfo.y = mainBoard.y + 16 + 340;
      tokenPosInfo.isShow = true;
      tokenPosInfo.pos = "main";
      tokenPosInfo.isProvisional = false;
    });
  }

  return allItemPosition;
};

/**
 * 设置用户板上的牌和令牌的位置
 */
export const setUserBoardTokenCardPos = (
  gameData: BoardProps<SP_GameType>,
  allItemPosition: AllItemPositionType,
  shapes: shapesType,
) => {
  gameData.G.playersInfo.forEach((player, playId) => {
    const playerBoard = shapes.find((shape) => shape.id === `UserBoard${playId}`);
    if (!playerBoard) {
      console.error(`UserBoard${playId} not found`);
      return;
    }
    const pos: Record<SP_ColorEnum, number> = {
      [SP_ColorEnum.Red]: 0,
      [SP_ColorEnum.Blue]: 0,
      [SP_ColorEnum.Purple]: 0,
      [SP_ColorEnum.Black]: 0,
      [SP_ColorEnum.Pink]: 0,
      [SP_ColorEnum.Yellow]: 0,
    };

    player.cards.forEach((card) => {
      const cardInfo = SP_CardObj[card];
      const cardPosInfo = allItemPosition.cards[card];
      cardPosInfo.x = playerBoard.x + 72 + colorListObj[cardInfo.color] * 80;
      pos[cardInfo.color]++;
      cardPosInfo.y = playerBoard.y + 45 + (pos[cardInfo.color] - 1) * 23.2;
      cardPosInfo.isShow = true;
      cardPosInfo.pos = playId;
      cardPosInfo.isProvisional = false;
      cardPosInfo.isFaceUp = true;
      cardPosInfo.isHorizontal = false;
    });
    player.tokens.forEach((token, index) => {
      const tokenPosInfo = allItemPosition.tokens[token];
      tokenPosInfo.x = playerBoard.x + 9 + (index % 2) * 62;
      tokenPosInfo.y = playerBoard.y + 40 + Math.floor(index / 2) * 59;
      tokenPosInfo.isShow = true;
      tokenPosInfo.pos = playId;
      tokenPosInfo.isProvisional = false;
    });

    player.provisionalTokens.forEach((token, index) => {
      const tokenPosInfo = allItemPosition.tokens[token];
      tokenPosInfo.x = playerBoard.x + 574;
      tokenPosInfo.y = playerBoard.y + 20 + index * 80;
      tokenPosInfo.pos = playId;
      tokenPosInfo.isProvisional = true;
    });
  });
};
