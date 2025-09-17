import type { SplendorGameGemNameType } from "@game/shared";
import type Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Group, Text, Circle } from "react-konva";

interface CardPointProps {
  x: number;
  y: number;
  point: number;
  type: SplendorGameGemNameType;
}

export const CardPoint = React.memo(({ x, y, point, type }: CardPointProps) => {
  // 总体字体大小
  const fontSize = 90;
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

  return (
    <Group ref={groupRef} x={x} y={y} scaleX={0.4} scaleY={0.4}>
      {/* 外圈 */}
      <Circle
        radius={50}
        fillRadialGradientStartPoint={{ x: -20, y: -20 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndRadius={50}
        fillRadialGradientColorStops={gemGradients[type]}
        stroke="white"
        strokeWidth={3}
        shadowColor="rgba(0,0,0,0.4)"
        shadowBlur={3}
        shadowOffset={{ x: 3, y: 3 }}
      />

      {/* 圆心数字 */}
      <Text
        text={point.toString()}
        fontSize={fontSize}
        fill="white"
        fontFamily="Arial"
        fontStyle="bold"
        stroke="black"
        strokeWidth={2}
        width={fontSize * 2} // 给一个宽度（半径 * 2）
        height={fontSize * 2} // 高度同理
        align="center" // 水平居中
        verticalAlign="middle" // 垂直居中
        offsetX={fontSize - 0} // 把 (0,0) 移到圆心
        offsetY={fontSize}
        skewX={-0.2}
      />
    </Group>
  );
});
