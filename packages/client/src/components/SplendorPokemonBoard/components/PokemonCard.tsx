import { useEffect, useRef, useState } from "react";
import React from "react";

import { type SP_CardIdType, SP_CardObj } from "@game/shared";
import Konva from "konva";
import { Group, Image, Rect } from "react-konva";
import useImage from "use-image";

import { BackImgMap, ImgMap } from "../imgMap";
import { PokemonCardDebugInfo } from "./PokemonCardDebugInfo";

interface Props {
  x: number;
  y: number;
  isFaceUp: boolean;
  id: SP_CardIdType;
  isHorizontal?: boolean;
  onClick?: () => void;
}

export const PokemonCard = React.memo(({ x, y, id, isFaceUp, isHorizontal, onClick }: Props) => {
  const a = 12.5;
  const imageWidth = 900 / a;
  const imageHeight = 1200 / a;
  const imageScale = 0.08 * a;

  const cardInfo = SP_CardObj[id];

  const [image] = useImage(ImgMap[cardInfo.id]);
  const [backImage] = useImage(BackImgMap[cardInfo.level]);

  const groupRef = useRef<Konva.Group>(null);
  const [nowIsFaceUp, setNowIsFaceUp] = useState(isFaceUp);

  /* ✅ 平滑移动动画 */
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.to({
      x: x + (imageWidth * imageScale) / 2,
      y: y + (imageHeight * imageScale) / 2,
      duration: 0.8,
      easing: Konva.Easings.EaseInOut,
    });
  }, [x, y]);

  /* ✅ 翻牌动画 */
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    if (nowIsFaceUp === isFaceUp) return;

    g.to({
      scaleX: 0,
      duration: 0.2,
      onFinish: () => {
        setNowIsFaceUp(isFaceUp);
        g.to({
          scaleX: imageScale,
          duration: 0.2,
        });
      },
    });
  }, [isFaceUp, nowIsFaceUp]);

  /* ✅ 横置动画 */
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.to({
      rotation: isHorizontal ? -90 : 0,
      duration: 0.1,
    });
  }, [isHorizontal]);

  const cardImage = nowIsFaceUp ? image : backImage;

  return (
    <Group
      ref={groupRef}
      scaleX={imageScale}
      scaleY={imageScale}
      offsetX={imageWidth / 2}
      offsetY={imageHeight / 2}
      onClick={() => onClick?.()}
    >
      {/* ✅ 阴影层（替代 shadowBlur） */}
      {cardImage && (
        <Group>
          {/* 🧱 立体感方块层 - 模拟卡牌厚度 */}
          <Rect
            x={2}
            y={2}
            width={imageWidth}
            height={imageHeight}
            cornerRadius={6}
            fill="#000"
            opacity={0.25}
            listening={false}
          />
          <Rect
            x={1}
            y={1}
            width={imageWidth}
            height={imageHeight}
            cornerRadius={6}
            fill="#000"
            opacity={0.15}
            listening={false}
          />
          {/* 🎴 主卡牌 */}
          <Image image={cardImage} width={imageWidth} height={imageHeight} cornerRadius={6} />
          <Rect
            width={imageWidth}
            height={imageHeight / 3}
            cornerRadius={6}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 0, y: imageHeight / 3 }}
            fillLinearGradientColorStops={[0, "rgba(255,255,255,0.15)", 1, "rgba(255,255,255,0)"]}
            listening={false}
          />
        </Group>
      )}

      {/* ✅ 主卡牌层 */}
      {/* {cardImage && <Image image={cardImage} width={imageWidth} height={imageHeight} cornerRadius={6} />} */}

      <PokemonCardDebugInfo cardInfo={cardInfo} />
    </Group>
  );
});
