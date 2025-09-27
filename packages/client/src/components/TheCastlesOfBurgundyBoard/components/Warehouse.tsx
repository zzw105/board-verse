import { Group, Rect, Text } from "react-konva";
import { StateEnum, type BlackMarketType } from "@game/shared";
import { BuildingBackground } from "./BuildingBackground";
import { useContext } from "react";
import { TheCastlesOfBurgundyGameContext } from "../../../store/TheCastlesOfBurgundyGameContext";
import { Building } from "./Building";
import React from "react";
import { useDebugStore } from "../../../store/useDebugStore";
import { Cargo } from "./Cargo";

interface Props {
  x: number;
  y: number;
  number: number;
}

export const Warehouse = ({ x, y, number }: Props) => {
  const gameData = useContext(TheCastlesOfBurgundyGameContext);
  const warehouseWidth = 106;
  const warehouseHeight = 106;
  // const buildingBackgroundDist = 56;
  const warehouse = gameData.G.mainBoardInfo.warehouseMarketList[number - 1].warehouse;

  return (
    <Group
      x={x}
      y={y}
      width={warehouseWidth}
      height={warehouseHeight}
      offsetX={warehouseWidth / 2}
      offsetY={warehouseHeight / 2}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      {/* <Rect width={warehouseWidth} height={warehouseHeight} fill="blue" opacity={0.5} /> */}
      {warehouse.map((item, index) => {
        const groupIndex = Math.floor(index / 4); // 第几组
        const posInGroup = index % 4; // 组内位置

        const x = (posInGroup % 2) * 55 + groupIndex * 20;
        const y = Math.floor(posInGroup / 2) * 55;
        return <Cargo key={"Cargo" + index} x={x} y={y} cargoInfo={item} />;
      })}
    </Group>
  );
};
