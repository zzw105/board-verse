import { useContext } from "react";
import React from "react";

import { StateEnum } from "@game/shared";
import { message } from "antd";
import { Group } from "react-konva";

import { BoardContext } from "../../../store/BoardContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";
import { useTooltipStore } from "../../../store/useTooltipStore";
import { Building } from "./Building";
import { BuildingBackground } from "./BuildingBackground";

interface Props {
  x: number;
  y: number;
}

export const BlackMarket = ({ x, y }: Props) => {
  const { gameData, nowPlayingPlayerID, clientPlayerID, clientPlayerInfo } = useContext(BoardContext);
  const { stagesType } = useTheCastlesOfBurgundyStore();
  const { targetLeave } = useTooltipStore();

  const blackMarketWidth = 165;
  const blackMarketHeight = 165;
  const buildingBackgroundDist = 54;

  const selectable = nowPlayingPlayerID === clientPlayerID && clientPlayerInfo.ability.canBuyBlackBuilding;
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

        return (
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
                selectable={selectable && stagesType === undefined}
                onSelect={() => {
                  if (item.building === StateEnum.EMPTY) return;
                  if (clientPlayerInfo.buildings.length >= 3) {
                    message.error("你只能拥有3个建筑");
                    return;
                  }
                  if (clientPlayerInfo.coins < 2) {
                    message.error("你需要2个银币才能购买");
                    return;
                  }
                  gameData.moves.getBlackBuildingMove(item.building.id);
                  document.body.style.cursor = "default";
                  message.success(`成功获取 ${item.building.color}`);
                  targetLeave();
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Group>
  );
};
