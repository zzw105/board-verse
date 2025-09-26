import { Group } from "react-konva";
import { StateEnum, type BlackMarketType } from "@game/shared";
import { BuildingBackground } from "./BuildingBackground";
import { useContext } from "react";
import { TheCastlesOfBurgundyGameContext } from "../../../store/TheCastlesOfBurgundyGameContext";
import { Building } from "./Building";
import React from "react";

interface Props {
  x: number;
  y: number;
  number: number;
}

export const Warehouse = ({ x, y, number }: Props) => {
  const gameData = useContext(TheCastlesOfBurgundyGameContext);
  const warehouseMarketWidth = 109;
  const warehouseMarketHeight = 125;
  const buildingBackgroundDist = 56;
  let warehouseMarket: BlackMarketType[] = [];
  warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketList[number - 1].market;

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
        if (item.y === 0) {
          return (
            <React.Fragment key={`WarehouseMarket-${item.x}-${item.y}`}>
              <BuildingBackground
                key={`BuildingBackground-${item.x}-${item.y}`}
                x={item.x * buildingBackgroundDist}
                y={0}
                type={item.background}
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  key={`Building-${item.x}-${item.y}`}
                  x={item.x * buildingBackgroundDist}
                  y={0}
                  buildingInfo={item.building}
                />
              )}
            </React.Fragment>
          );
        } else if (item.y === 1) {
          return (
            <React.Fragment key={`WarehouseMarket-${item.x}-${item.y}`}>
              <BuildingBackground
                key={`BuildingBackground-${item.x}-${item.y}`}
                x={item.x * buildingBackgroundDist}
                y={65}
                type={item.background}
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  key={`Building-${item.x}-${item.y}`}
                  x={item.x * buildingBackgroundDist}
                  y={65}
                  buildingInfo={item.building}
                />
              )}
            </React.Fragment>
          );
        }
      })}
    </Group>
  );
};
