import { useContext } from "react";
import React from "react";

import { StateEnum } from "@game/shared";
import { message } from "antd";
import { Group } from "react-konva";

import { BoardContext } from "../../../store/BoardContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";
import { afterUseDice, canReach } from "../../../utils";
import { Building } from "./Building";
import { BuildingBackground } from "./BuildingBackground";
import { WorkerUseNumber } from "./WorkerUseNumber";

interface Props {
  x: number;
  y: number;
  marketNumber: number;
}

export const WarehouseMarket = ({ x, y, marketNumber }: Props) => {
  const { choiceDice } = useTheCastlesOfBurgundyStore();
  const { gameData, nowPlayingPlayerID, clientPlayerID, clientPlayerInfo } = useContext(BoardContext);

  const warehouseMarketWidth = 109;
  const warehouseMarketHeight = 125;
  const buildingBackgroundDist = 56;
  const warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketList[marketNumber - 1].market;

  const reachInfo = canReach(
    choiceDice.dicePoint,
    marketNumber,
    clientPlayerInfo.ability.workerPoints,
    clientPlayerInfo.workers,
  );
  const selectable = nowPlayingPlayerID === clientPlayerID && reachInfo.can;

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
                key={item.building.id}
                x={xPos}
                y={yPos}
                buildingInfo={item.building}
                selectable={selectable}
                onSelect={() => {
                  if (item.building === StateEnum.EMPTY) return;
                  if (clientPlayerInfo.buildings.length >= 3) {
                    message.error("已有3个建筑，无法购买");
                    return;
                  }
                  gameData.moves.getBuildingMove(item.building.id, choiceDice.dicePoint, marketNumber, reachInfo.steps);
                  afterUseDice(`成功获取 ${item.building.color}`);
                }}
              />
            )}
          </React.Fragment>
        );
      })}
      {selectable && reachInfo.steps > 0 && <WorkerUseNumber x={150} y={100} scale={1.3} number={reachInfo.steps} />}
    </Group>
  );
};
