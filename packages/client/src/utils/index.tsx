import type {
  PlayerType,
  SplendorGameCardType,
  SplendorGameNobleType,
  SplendorGameTokenNameType,
  TokensObjType,
} from "@game/shared";
import { Card } from "../components/SplendorBoard/components/Card";
import type { JSX } from "react";
import { Token } from "../components/SplendorBoard/components/Token";
import { Circle, Group, Rect, Text } from "react-konva";
import { useUserStore } from "../store/useUserStore";
import { eventBus } from "./eventBus";
import { OperationKeyEnum } from "../enum/game";
import { Noble } from "../components/SplendorBoard/components/Noble";

export const generateCardJSX = (
  cards: SplendorGameCardType[],
  positionX: Record<number, number>,
  positionY: Record<number, number>,
  xIndex: number,
  yIndex: number,
  splitIndex = 4
) => {
  if (!cards || cards.length === 0) return [];
  const isCurrent = useUserStore.getState().isCurrent;
  const stagesType = useUserStore.getState().stagesType;
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
        canOperations={stagesType === "discard" ? false : true}
        isCurrent={isCurrent}
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
        canOperations={stagesType === "discard" ? false : true}
        isCurrent={isCurrent}
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
      const isCurrent = useUserStore.getState().isCurrent;
      const stagesType = useUserStore.getState().stagesType;
      tokenJSX.push(
        <Token
          key={tokenName + i}
          x={tokenPosition[tokenName].x}
          y={tokenPosition[tokenName].y - 10 * i - (isHighlight ? 30 : 0)}
          type={tokenName}
          canOperations={tokenName === "gold" || stagesType === "discard" ? false : true}
          isCurrent={isCurrent}
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

export const generateOwnedTokensJSX = (playerInfo: PlayerType, x = 500, y = 40, scale = 1) => {
  const color = {
    green: "#dbffdb",
    red: "#ffdada",
    blue: "#dadbff",
    white: "#FFFFFF",
    black: "#f0f0f0",
    gold: "#fff7da",
  } as const;
  const tokenJSX: JSX.Element[] = [];
  const width = 140;
  const height = 160;

  const stagesType = useUserStore.getState().stagesType;
  const canOperations = stagesType === "discard";

  //
  (["green", "red", "blue", "white", "black", "gold"] as const).forEach((tokenName, i) => {
    tokenJSX.push(
      <Group
        x={x + i * (width + 100) * scale}
        y={y}
        scaleX={scale}
        scaleY={scale}
        key={"OwnedTokens" + tokenName}
        style={{ cursor: "pointer" }}
        onMouseOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          eventBus.emit("operationOnClick", { type: OperationKeyEnum.RETURN_TOKEN, name: tokenName });
        }}
      >
        <Circle
          key={"OwnedTokens" + tokenName + "Rect"}
          radius={width / 1.5}
          x={width / 2}
          y={height / 2}
          stroke="#555"
          strokeWidth={3}
          fill={color[tokenName]}
          shadowColor={canOperations ? tokenName : "black"}
          shadowBlur={canOperations ? 30 : 10}
          shadowOpacity={canOperations ? 1 : 0.3}
          cornerRadius={10}
        />

        <Text
          key={"OwnedTokens" + tokenName + "Text"}
          width={width}
          height={height}
          align="center"
          verticalAlign="middle"
          text={playerInfo.tokens[tokenName].toString()}
          fontSize={70}
          fontFamily="Calibri"
          fill="#555"
        />
        <Token
          key={"OwnedTokens" + tokenName + "Token"}
          x={width}
          y={0}
          type={tokenName}
          canOperations={false}
          offsetCenter
          scale={0.4}
        />
        {tokenName !== "gold" && (
          <>
            <Rect
              key={"OwnedTokens" + tokenName + "cardPoint"}
              width={(width * 2) / 3}
              height={(height * 2) / 3}
              x={0}
              y={height}
              offsetX={(width * 2) / 3 / 2}
              offsetY={(height * 2) / 3 / 2}
              stroke="#555"
              strokeWidth={3}
              fill={color[tokenName]}
              shadowColor={canOperations ? tokenName : "black"}
              shadowBlur={canOperations ? 30 : 10}
              shadowOpacity={canOperations ? 1 : 0.3}
              cornerRadius={10}
            />
            <Text
              key={"OwnedTokens" + tokenName + "cardPointText"}
              width={(width * 2) / 3}
              height={(height * 2) / 3}
              x={0}
              y={height}
              offsetX={(width * 2) / 3 / 2}
              offsetY={(height * 2) / 3 / 2}
              align="center"
              verticalAlign="middle"
              text={playerInfo.cardPoint[tokenName].toString()}
              fontSize={60}
              fontStyle="bold"
              fontFamily="Calibri"
              fill="#555"
            />
          </>
        )}
      </Group>
    );
  });
  return tokenJSX;
};

export const generateOwnedLockCardJSX = (playerInfo: PlayerType, canOperations = true, y = 300) => {
  const lockCardJSX: JSX.Element[] = [];
  const lockCards = playerInfo.lockCards;
  const isCurrent = useUserStore.getState().isCurrent;
  lockCards.forEach((item, index) => {
    lockCardJSX.push(
      <Card
        key={item.name}
        x={80 + index * 350}
        y={y}
        cardName={item.name}
        isFaceUp={true}
        canOperations={canOperations}
        isCurrent={isCurrent}
        isHorizontal
      />
    );
  });
  return lockCardJSX;
};
export const generateOwnedNobleJSX = (playerInfo: PlayerType, x = 1200, y = 330, Noblex = 300, scale = 1.15) => {
  const nobleJSX: JSX.Element[] = [];
  const nobles = [...playerInfo.nobles, ...playerInfo.nobles, ...playerInfo.nobles, ...playerInfo.nobles];
  nobles.forEach((item, index) => {
    nobleJSX.push(<Noble key={item.name} x={x + index * Noblex} y={y} scale={scale} nobleName={item.name} />);
  });
  return nobleJSX;
};

export const generateNobleJSX = (nobles: SplendorGameNobleType[]) => {
  const nobleJSX: JSX.Element[] = [];
  nobles.forEach((item, index) => {
    nobleJSX.push(<Noble key={"Noble" + item.name} x={2150} y={80 + index * 255} nobleName={item.name} />);
  });
  return nobleJSX;
};
