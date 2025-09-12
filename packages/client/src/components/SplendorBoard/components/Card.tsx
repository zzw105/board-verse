import { useEffect, useState, useRef } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import { Tween } from "konva/lib/Tween";
import cardsImg from "../../../assets/imgs/cards.png";
import { splendorGameCardList, type SplendorGameCardName } from "@game/shared";
import type Konva from "konva";

interface CardProps {
  x: number;
  y: number;
  cardName: SplendorGameCardName;
  text?: string;
}

export function Card({ x, y, cardName, text }: CardProps) {
  const cardInfo = splendorGameCardList[cardName];
  const scale = 0.4;
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

    // 翻转动画保持左上角固定
    // const tween1 = new Tween({
    //   node: g,
    //   duration: 0.2,
    //   scaleX: 0, // 缩小到0
    //   x: (x + width * scale) / 2, // 以中心为动画中心
    // });

    // tween1.onFinish = () => {
    //   setFlipped(!flipped);
    //   const tween2 = new Tween({
    //     node: g,
    //     duration: 0.2,
    //     scaleX: scale,
    //     x: x, // 动画结束恢复左上角
    //   });
    //   tween2.play();
    // };

    // tween1.play();

    const newTween = new Tween({
      node: g,
      x: (x + width * scale) / 2, // 以中心为动画中心
    });
    newTween.onFinish = () => {
      const tween1 = new Tween({
        node: g,
        duration: 0.2,
        scaleX: 0, // 缩小到0
      });
      tween1.play();
      tween1.onFinish = () => {
        setFlipped(!flipped);
        const tween2 = new Tween({
          node: g,
          duration: 0.2,
          scaleX: scale,
          x: x, // 动画结束恢复左上角
        });
        tween2.play();
      };
    };
    newTween.play();
  };

  return (
    <Group x={x} y={y} ref={groupRef} onClick={handleFlip} scaleX={scale} scaleY={scale}>
      {/* 卡牌底色 */}
      <Rect width={width} height={height} fill="#fff" shadowBlur={5} cornerRadius={8} />

      {/* 正面 */}
      {frontImage && !flipped && (
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
