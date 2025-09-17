import { useEffect, useRef, useState, type JSX } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import Konva from "konva";
import { splendorGameCardObj, type SplendorGameCardName, type SplendorGameCardType } from "@game/shared";
import { Gem } from "./Gem";
import { CardPoint } from "./CardPoint";
import React from "react";
import { useContextMenuStore } from "../../../store/useContextMenuStore";
import { cardsImage } from "../../../utils/loadAllImg";
import { Tween } from "konva/lib/Tween";
// import cardsImg from "../../../assets/imgs/cards.png";

interface CardProps {
  x: number;
  y: number;
  isFaceUp: boolean; // 受控翻牌
  canOperations?: boolean;
  cardName: SplendorGameCardName;
}

const scale = 0.4;
const width = 1235 / 5;
const height = 2058 / 6;

export const Card = React.memo(({ x, y, cardName, isFaceUp, canOperations }: CardProps) => {
  // 当前的卡片信息
  const cardInfo = splendorGameCardObj[cardName] as SplendorGameCardType;

  // 右键菜单Store
  const { handleContextMenu } = useContextMenuStore();

  // 卡片组
  const groupRef = useRef<Konva.Group>(null);
  // 卡片移动动画
  const tweenRef = useRef<Tween | null>(null);
  // 卡片翻牌动画
  const flipTweenRef = useRef<Tween | null>(null);
  // 当前翻转状态
  const [nowIsFaceUp, setNowIsFaceUp] = useState(isFaceUp);

  // 平滑移动动画
  useEffect(() => {
    if (!groupRef.current) return;
    if (tweenRef.current) tweenRef.current.finish();
    const g = groupRef.current;
    tweenRef.current = new Tween({
      node: groupRef.current,
      duration: 0.4,
      x: x + (width * scale) / 2,
      y: y + (height * scale) / 2,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        tweenRef.current = null;
        g.cache();
      },
    });
    g.clearCache();
    tweenRef.current.play();
  }, [x, y]);

  // 翻牌动画
  useEffect(() => {
    if (!groupRef.current) return;
    const g = groupRef.current;

    if (nowIsFaceUp !== isFaceUp) {
      if (flipTweenRef.current) flipTweenRef.current.finish();
      flipTweenRef.current = new Tween({ node: g, duration: 0.1, scaleX: 0 });
      flipTweenRef.current.onFinish = () => {
        setNowIsFaceUp(isFaceUp);
        // g.scaleX(isFaceUp ? scale : -scale); // 根据外部状态直接翻牌
        flipTweenRef.current = new Tween({ node: g, duration: 0.1, scaleX: scale });
        flipTweenRef.current.onFinish = () => {
          g.cache();
        };
        flipTweenRef.current.play();
      };
      g.clearCache();
      flipTweenRef.current.play();
    }
  }, [isFaceUp, nowIsFaceUp]);

  // 卡片花费点位置
  const cardPointPos = [
    { x: 30, y: 310 },
    { x: 30, y: 265 },
    { x: 30, y: 220 },
    { x: 30, y: 175 },
  ];
  // 卡片花费点
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

  // 卡片背面图片位置
  const backImgPos = [0, 1, 2];

  return (
    <Group
      ref={groupRef}
      offsetX={width / 2}
      offsetY={height / 2}
      scaleX={scale}
      scaleY={scale}
      onContextMenu={(e) => canOperations && handleContextMenu({ e, type: "card", name: cardInfo.name })}
    >
      <Rect width={width} height={height} fill="#fff" shadowBlur={8} cornerRadius={8} />

      {/* 正面 */}
      {cardsImage && nowIsFaceUp && (
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
      {cardsImage && !nowIsFaceUp && (
        <KonvaImage
          key={cardInfo.name + "backImage"}
          image={cardsImage}
          width={width}
          height={height}
          crop={{ x: backImgPos[cardInfo.level - 1] * width, y: 5 * height, width, height }}
          cornerRadius={8}
        />
      )}
    </Group>
  );
});
