import { useContext } from "react";
import React from "react";

import { StateEnum } from "@game/shared";
import { message } from "antd";
import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";

import countersImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/counters.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { BoardContext } from "../../../store/BoardContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";
import { afterUseDice, canReach } from "../../../utils";
import { Building } from "./Building";
import { BuildingBackground } from "./BuildingBackground";

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

  const [countersImage] = useImage(countersImg);
  const countersImageWidth = 336 / 6; // 从文件中获取写死
  const countersImageHeight = 92; // 从文件中获取写死
  const countersImageScale = 0.4;
  const countersWidth = 50;
  const countersHeight = 40;

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
      {selectable && reachInfo.steps > 0 && (
        <Group
          x={150}
          y={100}
          scaleX={1.3}
          scaleY={1.3}
          width={countersWidth}
          height={countersHeight}
          offsetX={countersWidth / 2}
          offsetY={countersHeight / 2}
          // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
        >
          <Rect width={countersWidth} height={countersHeight} fill="white" />
          <Image
            image={countersImage}
            shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
            width={countersImageWidth}
            height={countersImageHeight}
            scale={{ x: countersImageScale, y: countersImageScale }}
            crop={{
              x: 0 * countersImageWidth,
              y: 0 * countersImageHeight,
              width: countersImageWidth,
              height: countersImageHeight,
            }}
          />
          <Text x={30} y={6} text={reachInfo.steps.toString()} fontSize={30} fill="black" />
        </Group>
      )}
    </Group>
  );
};
