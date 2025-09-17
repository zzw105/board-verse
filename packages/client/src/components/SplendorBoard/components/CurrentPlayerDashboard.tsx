import { Group, Rect, Text } from "react-konva";
import { type PlayerType } from "@game/shared";
import React, { useEffect, useRef, type JSX } from "react";
import type Konva from "konva";
import { generateOwnedTokensJSX } from "../../../utils";

interface SpriteImageProps {
  playerInfo: PlayerType;
}

export const CurrentPlayerDashboard = React.memo(({ playerInfo }: SpriteImageProps) => {
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.cache();
  }, []);

  const ownedTokens = generateOwnedTokensJSX(playerInfo);

  return (
    <Group ref={groupRef} x={10 * 2} y={580 * 2}>
      <Rect
        stroke="#555"
        strokeWidth={3}
        fill="rgba(243, 207, 205, 0.5)"
        width={1070 * 2}
        height={320 * 2} // 近似高度
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.2}
        cornerRadius={10}
      />

      {ownedTokens}
      {/* <Rect
        x={20}
        y={60}
        stroke="#555"
        strokeWidth={5}
        fill="#ddd"
        width={300}
        height={200} // 近似高度
        shadowColor="black"
        shadowBlur={10}
        shadowOffsetX={10}
        shadowOffsetY={10}
        shadowOpacity={0.2}
        cornerRadius={10}
      />
      <Text
        x={20}
        y={60}
        text={"123"}
        fontSize={18}
        fontFamily="Calibri"
        fill="#555"
        width={300}
        padding={20}
        align="center"
      /> */}
    </Group>
  );
});
