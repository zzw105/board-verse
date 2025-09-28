import { useContext } from "react";
import React from "react";

import { StateEnum } from "@game/shared";
import { Group } from "react-konva";

import { BoardContext } from "../../../store/BoardContext";
import { Building } from "./Building";
import { BuildingBackground } from "./BuildingBackground";

interface Props {
  x: number;
  y: number;
}

export const BlackMarket = ({ x, y }: Props) => {
  const { gameData } = useContext(BoardContext);

  const blackMarketWidth = 165;
  const blackMarketHeight = 165;
  const buildingBackgroundDist = 54;
  return (
    <Group
      x={x}
      y={y}
      width={blackMarketWidth}
      height={blackMarketHeight}
      offsetX={blackMarketWidth / 2}
      offsetY={blackMarketHeight / 2}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      {/* <Rect width={blackMarketWidth} height={blackMarketHeight} fill="black" /> */}
      {gameData.G.mainBoardInfo.blackMarket.map((item) => {
        if (item.background === StateEnum.EMPTY) {
          return null;
        }
        const baseY = blackMarketHeight / 2;
        const yPos = baseY + (item.y - 1) * 47;

        const xPos = item.y === 1 ? 1 + (item.x + 1) * buildingBackgroundDist : 28 + item.x * buildingBackgroundDist;
        <React.Fragment key={`BlackMarket-${item.x}-${item.y}`}>
          <BuildingBackground
            key={`BlackMarket-BuildingBackground-${item.x}-${item.y}`}
            x={xPos}
            y={yPos}
            type={item.background}
            center
          />
          {item.building !== StateEnum.EMPTY && (
            <Building
              key={`BlackMarket-Building-${item.x}-${item.y}`}
              x={xPos}
              y={yPos}
              buildingInfo={item.building}
              center
            />
          )}
        </React.Fragment>;
      })}
    </Group>
  );
};
