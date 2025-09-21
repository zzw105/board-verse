import type { SplendorGameGemNameType } from "@game/shared";
import type Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Group, Text, Rect } from "react-konva";

interface NoblePointProps {
  x: number;
  y: number;
  point: number;
  type: SplendorGameGemNameType;
}

export const NoblePoint = React.memo(({ x, y, point, type }: NoblePointProps) => {
  // 总体字体大小
  const fontSize = 80;
  const gemGradients: Record<SplendorGameGemNameType, (string | number)[]> = {
    white: [0, "#ffffff", 0.3, "#f0f0f0", 0.7, "#d9d9d9", 1, "#bfbfbf"],
    blue: [0, "#ffffff", 0.2, "#99ccff", 0.7, "#3399ff", 1, "#0066cc"],
    black: [0, "#ffffff", 0.2, "#666666", 0.7, "#333333", 1, "#000000"],
    red: [0, "#ffffff", 0.2, "#ffcccc", 0.7, "#ff3333", 1, "#cc0000"],
    green: [0, "#ffffff", 0.2, "#b3ffb3", 0.7, "#33cc33", 1, "#009900"],
  };

  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.cache();
  }, []);
  const width = 75;
  const height = 95;

  return (
    <Group ref={groupRef} x={x} y={y} scaleX={0.4} scaleY={0.4}>
      {/* 外圈 */}
      <Rect
        width={width}
        height={height}
        cornerRadius={8}
        fillRadialGradientStartPoint={{ x: width / 2, y: height / 2 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndPoint={{ x: width / 2, y: height / 2 }}
        fillRadialGradientEndRadius={Math.max(width, height) / 2}
        fillRadialGradientColorStops={gemGradients[type]}
        stroke="white"
        strokeWidth={9}
      />

      {/* 圆心数字 */}
      <Text
        text={point.toString()}
        width={width}
        height={height}
        fontSize={fontSize}
        fill="white"
        fontFamily="Arial"
        fontStyle="bold"
        stroke="black"
        strokeWidth={3}
        align="center" // 水平居中
        y={height / 2 - fontSize / 2} // 垂直居中大致算法
      />
    </Group>
  );
});
