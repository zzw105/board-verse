import { Group, Rect, Text, Star } from "react-konva";
import { type PlayerType } from "@game/shared";
import React, { useEffect, useRef } from "react";
import type Konva from "konva";
import { generateOwnedLockCardJSX, generateOwnedNobleJSX, generateOwnedTokensJSX } from "../../../utils";

interface SpriteImageProps {
  playerInfo: PlayerType;
  x: number;
  y: number;
  name: string;
}

export const OtherPlayerDashboard = React.memo(({ playerInfo, x, y, name }: SpriteImageProps) => {
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    // g.cache();
  }, []);

  const ownedTokens = generateOwnedTokensJSX(playerInfo, 260, 30, 0.5);
  const ownedLockCard = generateOwnedLockCardJSX(playerInfo, false, 120);
  const ownedNoble = generateOwnedNobleJSX(playerInfo, 40, 370, 240, 0.8);

  const starWidth = 200;
  const starHeight = 150;

  return (
    <Group ref={groupRef} x={x} y={y}>
      <Rect
        stroke="#555"
        strokeWidth={3}
        fill="rgba(175, 226, 188, 0.568)"
        width={1030}
        height={550} // 近似高度
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.2}
        cornerRadius={10}
      />

      {ownedTokens}
      {ownedLockCard}
      {ownedNoble}
      <Group scaleX={0.8} scaleY={0.8}>
        <Rect x={30} y={20} width={starWidth} height={starHeight} cornerRadius={8} fill="white" />

        <Text
          key={"OwnedScore"}
          x={30}
          y={20}
          width={(starWidth * 3) / 5}
          height={starHeight}
          align="center"
          verticalAlign="middle"
          text={playerInfo.score.toString()}
          fontSize={70}
          fontFamily="Calibri"
          fill="#555"
        />
        <Star
          key={"OwnedScoreStar"}
          x={30 + (starWidth * 3) / 4}
          y={20 + starHeight / 2}
          numPoints={5}
          innerRadius={15}
          outerRadius={35}
          fill="yellow"
          stroke="black"
          strokeWidth={2}
        />
      </Group>
      <Text
        key={"OwnedName"}
        width={1030}
        height={550}
        align="center"
        verticalAlign="middle"
        text={name}
        fontSize={200}
        fontFamily="Calibri"
        fill="#ecececac"
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.2}
      />
    </Group>
  );
});
