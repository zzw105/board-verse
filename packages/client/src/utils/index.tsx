import type { PlayerType, SplendorGameCardType, SplendorGameTokenNameType, TokensObjType } from "@game/shared";
import { Card } from "../components/SplendorBoard/components/Card";
import type { JSX } from "react";
import { Token } from "../components/SplendorBoard/components/Token";
import { Group, Rect, Text } from "react-konva";

export const generateCardJSX = (
  cards: SplendorGameCardType[],
  positionX: Record<number, number>,
  positionY: Record<number, number>,
  xIndex: number,
  yIndex: number,
  splitIndex = 4
) => {
  if (!cards || cards.length === 0) return [];

  // 前半部分（翻开）
  const firstPart = cards
    .slice(0, splitIndex)
    .map((item, index) => (
      <Card
        key={item.name}
        x={positionX[xIndex + 1 + 3 - index]}
        y={positionY[yIndex]}
        cardName={item.name}
        isFaceUp={true}
        canOperations={true}
      />
    ));

  // 后半部分（背面）
  const secondPart = cards
    .slice(splitIndex)
    .reverse()
    .map((item, index) => (
      <Card
        key={item.name}
        x={positionX[xIndex] + index * 8}
        y={positionY[yIndex]}
        cardName={item.name}
        isFaceUp={false}
      />
    ));

  return [...secondPart, ...firstPart];
};
export const generateTokenJSX = (
  tokens: TokensObjType,
  nowSelectTokens: TokensObjType,
  tokenPosition: Record<SplendorGameTokenNameType, { x: number; y: number }>
) => {
  const tokenJSX: JSX.Element[] = [];
  (["green", "red", "blue", "white", "black", "gold"] as const).forEach((tokenName) => {
    for (let i = 0; i < tokens[tokenName]; i++) {
      const isHighlight = i >= tokens[tokenName] - nowSelectTokens[tokenName];
      tokenJSX.push(
        <Token
          key={tokenName + i}
          x={tokenPosition[tokenName].x}
          y={tokenPosition[tokenName].y - 10 * i - (isHighlight ? 30 : 0)}
          type={tokenName}
          canOperations={tokenName === "gold" ? false : true}
        />
      );
    }
  });
  return tokenJSX;
};

export const isTokenSelect2 = (nowSelectTokens: TokensObjType) => {
  return Object.values(nowSelectTokens).some((v) => v >= 2);
};
export const isTokenSelectHasThreeOnes = (nowSelectTokens: TokensObjType) => {
  const count = Object.values(nowSelectTokens).filter((v) => v === 1).length;
  return count >= 3;
};

export const generateOwnedTokensJSX = (playerInfo: PlayerType) => {
  const color = {
    green: "#dbffdb",
    red: "#ffdada",
    blue: "#dadbff",
    white: "#FFFFFF",
    black: "#f0f0f0",
    gold: "#fff7da",
  } as const;
  const tokenJSX: JSX.Element[] = [];
  const width = 80 * 2;
  const height = 90 * 2;
  const x = 5 * 2;
  const y = 5 * 2;

  (["green", "red", "blue", "white", "black", "gold"] as const).forEach((tokenName, i) => {
    tokenJSX.push(
      <Group key={"OwnedTokens" + tokenName}>
        <Rect
          key={"OwnedTokens" + tokenName + "Rect"}
          x={x + i * width}
          y={y}
          width={width}
          height={height}
          stroke="#555"
          strokeWidth={3}
          fill={color[tokenName]}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.2}
          cornerRadius={10}
        />

        <Text
          key={"OwnedTokens" + tokenName + "Text"}
          x={x + i * width}
          y={y}
          width={width}
          height={height}
          align="center"
          verticalAlign="middle"
          text={playerInfo.tokens[tokenName].toString()}
          fontSize={60}
          fontFamily="Calibri"
          fill="#555"
        />
      </Group>
    );
  });
  return tokenJSX;
};

/* 
5 2 [0, 1, 2, 3, 4]

*/
