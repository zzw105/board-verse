import { useEffect, useRef } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import Konva from "konva";
import { splendorGameCardObj, type SplendorGameCardName, type SplendorGameCardType } from "@game/shared";
import { Gem } from "./Gem";
import { CardPoint } from "./CardPoint";
import React from "react";
import { useContextMenuStore } from "../../../store/useContextMenuStore";
import { cardsImage } from "../../../utils/loadAllImg";
// import cardsImg from "../../../assets/imgs/cards.png";

interface CardProps {
  x: number;
  y: number;
  isFaceUp: boolean; // 受控翻牌
  cardName: SplendorGameCardName;
  text?: string;
}

const scale = 0.7;
const width = 1235 / 5;
const height = 2058 / 6;

export const Card = React.memo(function Card({ x, y, cardName, text, isFaceUp }: CardProps) {
  const cardInfo = splendorGameCardObj[cardName] as SplendorGameCardType;

  const groupRef = useRef<Konva.Group>(null);
  const tweenRef = useRef<Konva.Tween | null>(null);
  const flipTweenRef = useRef<Konva.Tween | null>(null);
  const prevFaceUp = useRef(isFaceUp);

  const handleContextMenu = useContextMenuStore((s) => s.handleContextMenu);

  // 平滑移动动画
  useEffect(() => {
    if (!groupRef.current) return;
    if (tweenRef.current) tweenRef.current.finish();

    tweenRef.current = new Konva.Tween({
      node: groupRef.current,
      duration: 0.3,
      x: x + (width * scale) / 2,
      y: y + (height * scale) / 2,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        tweenRef.current = null;
      },
    });

    tweenRef.current.play();
  }, [x, y]);

  // 受控翻牌动画
  useEffect(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;

    if (prevFaceUp.current !== isFaceUp) {
      if (flipTweenRef.current) flipTweenRef.current.finish();
      flipTweenRef.current = new Konva.Tween({ node: g, duration: 0.2, scaleX: 0 });
      flipTweenRef.current.onFinish = () => {
        g.scaleX(isFaceUp ? scale : -scale); // 根据外部状态直接翻牌
      };
      flipTweenRef.current.play();
      prevFaceUp.current = isFaceUp;
    }
  }, [isFaceUp]);

  const cardPointPos = [
    { x: 30, y: 310 },
    { x: 30, y: 265 },
    { x: 30, y: 220 },
    { x: 30, y: 175 },
  ];

  const cardPointJsxList: JSX.Element[] = [];
  (["black", "red", "green", "blue", "white"] as const).forEach((gem) => {
    const element = cardInfo.cost[gem];
    if (element > 0) {
      const index = cardPointJsxList.length;
      const pos = cardPointPos[index];
      cardPointJsxList.push(
        <CardPoint key={cardInfo.name + "frontPoint" + gem} x={pos.x} y={pos.y} point={element} type={gem} />
      );
    }
  });

  const back = [0, 1, 2];

  return (
    <Group
      ref={groupRef}
      offsetX={width / 2}
      offsetY={height / 2}
      scaleX={scale}
      scaleY={scale}
      onContextMenu={(e) => handleContextMenu(e, "card", cardInfo.name)}
    >
      <Rect width={width} height={height} fill="#fff" shadowBlur={8} cornerRadius={8} />

      {/* 正面 */}
      {cardsImage && isFaceUp && (
        <>
          <KonvaImage
            key={cardInfo.name + "front"}
            image={cardsImage}
            width={width}
            height={height}
            crop={{ x: cardInfo.frameX * width, y: cardInfo.frameY * height, width, height }}
            cornerRadius={8}
          />
          <Rect x={0} y={0} width={width} height={85} fill="white" opacity={0.6} cornerRadius={[8, 8, 0, 0]} />
          <Gem key={cardInfo.name + "frontGem"} x={width - 45} y={85 / 2} offsetCenter type={cardInfo.color} />
          {cardInfo.point > 0 && (
            <Text
              key={cardInfo.name + "frontText"}
              text={cardInfo.point.toString()}
              fontSize={65}
              fill="white"
              fontFamily="Arial"
              fontStyle="bold italic"
              stroke="#000"
              strokeWidth={1}
              align="center"
              verticalAlign="middle"
              x={15}
              y={85 / 2}
              offsetY={65 / 2}
              skewX={-0.2}
            />
          )}
          {cardPointJsxList}
        </>
      )}

      {/* 背面 */}
      {cardsImage && !isFaceUp && (
        <KonvaImage
          key={cardInfo.name + "backImage"}
          image={cardsImage}
          width={width}
          height={height}
          crop={{ x: back[cardInfo.level - 1] * width, y: 5 * height, width, height }}
          cornerRadius={8}
        />
      )}

      {text && isFaceUp && (
        <Text text={text} fontSize={16} fill="#000" x={10} y={height - 30} width={width - 20} align="center" />
      )}
    </Group>
  );
});
