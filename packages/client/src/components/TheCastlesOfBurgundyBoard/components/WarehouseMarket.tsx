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
  number: number;
}

export const WarehouseMarket = ({ x, y, number }: Props) => {
  const { gameData } = useContext(BoardContext);
  const warehouseMarketWidth = 109;
  const warehouseMarketHeight = 125;
  const buildingBackgroundDist = 56;
  const warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketList[number - 1].market;

  return (
    <Group
      x={x}
      y={y}
      width={warehouseMarketWidth}
      height={warehouseMarketHeight}
      offsetX={warehouseMarketWidth / 2}
      offsetY={warehouseMarketHeight / 2}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      {/* <Rect width={warehouseMarketWidth} height={warehouseMarketHeight} fill="blue" /> */}

      {warehouseMarket.map((item) => {
        if (item.background === StateEnum.EMPTY) {
          return null;
        }
        const xPos = item.x * buildingBackgroundDist;
        const yPos = item.y === 0 ? 0 : 65;
        return (
          <React.Fragment key={`WarehouseMarket-${item.x}-${item.y}`}>
            <BuildingBackground
              key={`BuildingBackground-${item.x}-${item.y}`}
              x={xPos}
              y={yPos}
              type={item.background}
            />
            {item.building !== StateEnum.EMPTY && (
              <Building
                key={`Building-${item.x}-${item.y}`}
                x={xPos}
                y={yPos}
                buildingInfo={item.building}
                marketId={number}
              />
            )}
          </React.Fragment>
        );
      })}
    </Group>
  );
};
