import { useEffect, useState, useRef } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import { Tween } from "konva/lib/Tween";
import cardsImg from "../../../assets/imgs/cards.png";
import {
  splendorGameCardList,
  type SplendorGameCardName,
  type SplendorGameCardType,
  type SplendorGameGemNameType,
} from "@game/shared";
import type Konva from "konva";
import { Gem } from "./Gem";
import { CardPoint } from "./CardPoint";

interface CardProps {
  x: number;
  y: number;
  cardName: SplendorGameCardName;
  text?: string;
}

export function Card({ x, y, cardName, text }: CardProps) {
  const cardInfo = splendorGameCardList[cardName] as SplendorGameCardType;
  const scale = 0.7;
  const width: number = 1235 / 5;
  const height: number = 2058 / 6;

  const [frontImage, setFrontImage] = useState<HTMLImageElement | null>(null);
  const [cardBackInfo, setCardBackInfo] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);

  const groupRef = useRef<Konva.Group>(null);

  // 加载正面精灵图
  useEffect(() => {
    const img = new window.Image();
    img.src = cardsImg;
    img.onload = () => setFrontImage(img);

    if (cardInfo.level === 1) setCardBackInfo({ x: 0, y: 5 });
    else if (cardInfo.level === 2) setCardBackInfo({ x: 1, y: 5 });
    else if (cardInfo.level === 3) setCardBackInfo({ x: 2, y: 5 });
  }, []);

  const handleFlip = () => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const tween1 = new Tween({ node: g, duration: 0.2, scaleX: 0 });
    tween1.onFinish = () => {
      setFlipped(!flipped);
      const tween2 = new Tween({ node: g, duration: 0.2, scaleX: scale });
      tween2.play();
    };
    tween1.play();
  };
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
      cardPointJsxList.push(<CardPoint x={pos.x} y={pos.y} point={element} type={gem}></CardPoint>);
    }
  });

  return (
    <Group
      x={x + (width * scale) / 2}
      y={y + (height * scale) / 2}
      offsetX={width / 2}
      offsetY={height / 2}
      ref={groupRef}
      onClick={handleFlip}
      scaleX={scale}
      scaleY={scale}
    >
      {/* 卡牌底色 */}
      <Rect width={width} height={height} fill="#fff" shadowBlur={8} cornerRadius={8} />

      {/* 正面 */}
      {frontImage && !flipped && (
        <>
          <KonvaImage
            image={frontImage}
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
            x={0}
            y={0} // 贴近底部，也可以改成 0 表示顶部
            width={width}
            height={85} // 带子的高度，可以调
            fill="white"
            opacity={0.6}
            cornerRadius={[8, 8, 0, 0]} // 和卡片底部圆角一致（只给下边圆角）
          />
          <Gem x={width - 45} y={85 / 2} offsetCenter type={cardInfo.color}></Gem>
          {cardInfo.point > 0 && (
            <Text
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
      {frontImage && flipped && (
        <KonvaImage
          image={frontImage}
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
}
