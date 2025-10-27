import { Image as KonvaImage, Group } from "react-konva";
import { splendorGameGemList, type SplendorGameGemNameType, type SplendorGameGemType } from "@game/shared";
import { gemsImage } from "../../../utils/loadAllImg";
import React, { useEffect, useRef } from "react";
import type Konva from "konva";

interface SpriteImageProps {
  x: number;
  y: number;
  scale?: number;
  offsetCenter?: boolean;
  type: SplendorGameGemNameType;
}

export const Gem = React.memo(({ x, y, offsetCenter, scale = 0.35, type }: SpriteImageProps) => {
  // 宝石信息
  const gemInfo = splendorGameGemList[type] as SplendorGameGemType;
  const width = 950 / 5;
  const height = 168;

  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.cache();
  }, []);

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      scaleX={scale}
      scaleY={scale}
      offsetX={offsetCenter ? width / 2 : 0}
      offsetY={offsetCenter ? height / 2 : 0}
    >
      <KonvaImage
        shadowBlur={18}
        image={gemsImage!}
        width={width}
        height={height}
        crop={{
          x: gemInfo.frameX * width,
          y: gemInfo.frameY * width,
          width: width,
          height: height,
        }}
      />
    </Group>
  );
});
