import { useEffect, useRef } from "react";
import React from "react";

import { type SP_TokenIdType, SP_TokenObj } from "@game/shared";
import Konva from "konva";
import { Circle, Group, Image, Rect } from "react-konva";
import useImage from "use-image";

import { TokenImgMap } from "../imgMap";

interface Props {
  x: number;
  y: number;
  id: SP_TokenIdType;
  onClick?: () => void;
}

export const PokemonBall = React.memo(({ x, y, id, onClick }: Props) => {
  const a = 12.5;
  const imageWidth = 700 / a;
  const imageHeight = 700 / a;
  const imageScale = 0.08 * a;

  const ballInfo = SP_TokenObj[id];

  const [image] = useImage(TokenImgMap[ballInfo.color]);

  const groupRef = useRef<Konva.Group>(null);

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

  const cardImage = image;

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
            cornerRadius={600}
            fill="#000"
            opacity={0.25}
            listening={false}
          />
          <Rect
            x={1}
            y={1}
            width={imageWidth}
            height={imageHeight}
            cornerRadius={600}
            fill="#000"
            opacity={0.15}
            listening={false}
          />
          {/* 🎴 主卡牌 */}
          <Image image={cardImage} width={imageWidth} height={imageHeight} cornerRadius={600} />
          <Circle
            x={imageWidth / 2}
            y={imageHeight / 2 - imageHeight * 0.25} // 控制高光位置稍微靠上
            radius={imageWidth / 2}
            fillRadialGradientStartPoint={{ x: 0, y: 0 }}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPoint={{ x: 0, y: 0 }}
            fillRadialGradientEndRadius={imageWidth / 2}
            fillRadialGradientColorStops={[
              0,
              "rgba(255,255,255,0.3)", // 中心亮
              0.6,
              "rgba(255,255,255,0.05)", // 过渡
              1,
              "rgba(255,255,255,0)", // 边缘透明
            ]}
            listening={false}
          />
        </Group>
      )}
    </Group>
  );
});
