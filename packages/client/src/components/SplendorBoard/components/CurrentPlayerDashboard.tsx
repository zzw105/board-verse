import { Group, Rect, Text, Star } from "react-konva";
import { type PlayerType } from "@game/shared";
import React, { useEffect, useRef } from "react";
import type Konva from "konva";
import { generateOwnedLockCardJSX, generateOwnedNobleJSX, generateOwnedTokensJSX } from "../../../utils";

interface SpriteImageProps {
  playerInfo: PlayerType;
}

export const CurrentPlayerDashboard = React.memo(({ playerInfo }: SpriteImageProps) => {
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    // g.cache();
  }, []);

  const ownedTokens = generateOwnedTokensJSX(playerInfo);
  const ownedLockCard = generateOwnedLockCardJSX(playerInfo);
  const ownedNoble = generateOwnedNobleJSX(playerInfo);

  const starWidth = 200;
  const starHeight = 150;

  return (
    <Group ref={groupRef} x={10 * 2} y={580 * 2}>
      <Rect
        stroke="#555"
        strokeWidth={3}
        fill="rgba(243, 207, 205, 0.5)"
        width={2440}
        height={320 * 2} // 近似高度
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.2}
        cornerRadius={10}
      />
      {ownedTokens}
      {ownedLockCard}
      {ownedNoble}

      <Rect x={20} y={20} width={starWidth} height={starHeight} cornerRadius={8} fill="white" />
      <Text
        key={"OwnedScore"}
        x={20}
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
        x={20 + (starWidth * 3) / 4}
        y={20 + starHeight / 2}
        numPoints={5}
        innerRadius={15}
        outerRadius={35}
        fill="yellow"
        stroke="black"
        strokeWidth={2}
      />
    </Group>
  );
});
