import type { SplendorGameCardType } from "@game/shared";
import { Card } from "../components/SplendorBoard/components/Card";

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
      />
    ));

  // 后半部分（背面）
  const secondPart = cards
    .slice(splitIndex)
    .reverse()
    .map((item, index) => (
      <Card
        key={item.name}
        x={positionX[xIndex] + index * 4}
        y={positionY[yIndex]}
        cardName={item.name}
        isFaceUp={false}
      />
    ));

  return [...secondPart, ...firstPart];
};
