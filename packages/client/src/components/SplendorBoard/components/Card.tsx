import { useEffect, useState, useRef, useCallback } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import { Tween } from "konva/lib/Tween";
import {
  splendorGameCardObj,
  type SplendorGameCardName,
  type SplendorGameCardType,
  type SplendorGameGemNameType,
} from "@game/shared";
import type Konva from "konva";
import { Gem } from "./Gem";
import { CardPoint } from "./CardPoint";
import React from "react";
import { useContextMenuStore } from "../../../store/useContextMenuStore";
import { cardsImage } from "../../../utils/loadAllImg";

interface CardProps {
  x: number;
  y: number;
  isFaceUp: boolean;
  // setFlipped:(flipped:boolean)=>void;
  cardName: SplendorGameCardName;
  text?: string;
}

export const Card = React.memo(function Card({ x, y, cardName, text, isFaceUp }: CardProps) {
  const cardInfo = splendorGameCardObj[cardName] as SplendorGameCardType;
  const scale = 0.7;
  const width: number = 1235 / 5;
  const height: number = 2058 / 6;

  const [cardBackInfo, setCardBackInfo] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(isFaceUp);

  const groupRef = useRef<Konva.Group>(null);

  // 加载正面精灵图
  useEffect(() => {
    if (cardInfo.level === 1) setCardBackInfo({ x: 0, y: 5 });
    else if (cardInfo.level === 2) setCardBackInfo({ x: 1, y: 5 });
    else if (cardInfo.level === 3) setCardBackInfo({ x: 2, y: 5 });
  }, [cardInfo.level]);

  const handleFlip = useCallback(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const tween1 = new Tween({ node: g, duration: 0.2, scaleX: 0 });
    tween1.onFinish = () => {
      setFlipped(!flipped);
      const tween2 = new Tween({ node: g, duration: 0.2, scaleX: scale });
      tween2.onFinish = () => {
        g.cache();
      };
      tween2.play();
    };
    g.clearCache();
    tween1.play();
  }, [flipped, scale]); // 添加 scale 作为依赖

  useEffect(() => {
    if (isFaceUp !== flipped) {
      handleFlip();
    }
  }, [isFaceUp, flipped, handleFlip]);

  const cardPointPos = [
    {
      x: 30,
      y: 310,
    },
    {
      x: 30,
      y: 265,
    },
    {
      x: 30,
      y: 220,
    },
    {
      x: 30,
      y: 175,
    },
  ];
  const cardPointJsxList: JSX.Element[] = [];
  (["black", "red", "green", "blue", "white"] as SplendorGameGemNameType[]).forEach((gem) => {
    const element = cardInfo.cost[gem];
    if (element > 0) {
      const index = cardPointJsxList.length;
      const pos = cardPointPos[index];
      cardPointJsxList.push(
        <CardPoint key={cardInfo.name + "frontPoint" + gem} x={pos.x} y={pos.y} point={element} type={gem}></CardPoint>
      );
    }
  });

  const handleContextMenu = useContextMenuStore((s) => s.handleContextMenu);

  useEffect(() => {
    if (cardsImage && groupRef.current) {
      groupRef.current.cache();
    }
  }, []);

  return (
    <Group
      x={x + (width * scale) / 2}
      y={y + (height * scale) / 2}
      offsetX={width / 2}
      offsetY={height / 2}
      ref={groupRef}
      // onClick={handleFlip}
      scaleX={scale}
      scaleY={scale}
      onContextMenu={(e) => handleContextMenu(e, "card", cardInfo.name)}
    >
      {/* 卡牌底色 */}
      <Rect width={width} height={height} fill="#fff" shadowBlur={8} cornerRadius={8} />

      {/* 正面 */}
      {cardsImage && !flipped && (
        <>
          <KonvaImage
            key={cardInfo.name + "front"}
            image={cardsImage}
            width={width}
            height={height}
            crop={{
              x: cardInfo.frameX * width,
              y: cardInfo.frameY * height,
              width,
              height,
            }}
            cornerRadius={8}
          />
          <Rect
            key={cardInfo.name + "frontRect"}
            x={0}
            y={0} // 贴近底部，也可以改成 0 表示顶部
            width={width}
            height={85} // 带子的高度，可以调
            fill="white"
            opacity={0.6}
            cornerRadius={[8, 8, 0, 0]} // 和卡片底部圆角一致（只给下边圆角）
          />
          <Gem key={cardInfo.name + "frontGem"} x={width - 45} y={85 / 2} offsetCenter type={cardInfo.color}></Gem>
          {cardInfo.point > 0 && (
            <Text
              key={cardInfo.name + "frontText"}
              text={cardInfo.point.toString()}
              fontSize={65}
              fill="white"
              fontFamily="Arial" // 系统自带字体
              fontStyle="bold italic" // 粗体 + 斜体
              stroke="#000000"
              strokeWidth={1}
              align="center"
              verticalAlign="middle"
              x={15}
              y={85 / 2}
              offsetX={0}
              offsetY={65 / 2}
              skewX={-0.2}
            />
          )}

          {cardPointJsxList}
        </>
      )}

      {/* 背面 */}
      {cardsImage && flipped && (
        <KonvaImage
          key={cardInfo.name + "backImage"}
          image={cardsImage}
          width={width}
          height={height}
          crop={{
            x: cardBackInfo.x * width,
            y: cardBackInfo.y * height,
            width,
            height,
          }}
          cornerRadius={8}
        />
      )}

      {/* 卡牌文字 */}
      {text && !flipped && (
        <Text text={text} fontSize={16} fill="#000" x={10} y={height - 30} width={width - 20} align="center" />
      )}
    </Group>
  );
});
