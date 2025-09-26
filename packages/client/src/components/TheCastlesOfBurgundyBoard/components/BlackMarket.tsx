import { Group } from "react-konva";
import { StateEnum } from "@game/shared";
import { BuildingBackground } from "./BuildingBackground";
import { useContext } from "react";
import { TheCastlesOfBurgundyGameContext } from "../../../store/TheCastlesOfBurgundyGameContext";
import { Building } from "./Building";
import React from "react";

interface Props {
  x: number;
  y: number;
}

export const BlackMarket = ({ x, y }: Props) => {
  const gameData = useContext(TheCastlesOfBurgundyGameContext);

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
        if (item.y === 0) {
          return (
            <React.Fragment key={`BlackMarket-${item.x}-${item.y}`}>
              <BuildingBackground
                key={`BlackMarket-BuildingBackground-${item.x}-${item.y}`}
                x={28 + item.x * buildingBackgroundDist}
                y={blackMarketHeight / 2 - 47}
                type={item.background}
                center
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  key={`BlackMarket-Building-${item.x}-${item.y}`}
                  x={28 + item.x * buildingBackgroundDist}
                  y={blackMarketHeight / 2 - 47}
                  buildingInfo={item.building}
                  center
                />
              )}
            </React.Fragment>
          );
        } else if (item.y === 1) {
          return (
            <React.Fragment key={`BlackMarket-${item.x}-${item.y}`}>
              <BuildingBackground
                key={`BlackMarket-BuildingBackground-${item.x}-${item.y}`}
                x={1 + (item.x + 1) * buildingBackgroundDist}
                y={blackMarketHeight / 2}
                type={item.background}
                center
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  key={`BlackMarket-Building-${item.x}-${item.y}`}
                  x={1 + (item.x + 1) * buildingBackgroundDist}
                  y={blackMarketHeight / 2}
                  buildingInfo={item.building}
                  center
                />
              )}
            </React.Fragment>
          );
        } else if (item.y === 2) {
          return (
            <React.Fragment key={`BlackMarket-${item.x}-${item.y}`}>
              <BuildingBackground
                key={`BlackMarket-BuildingBackground-${item.x}-${item.y}`}
                x={28 + item.x * buildingBackgroundDist}
                y={blackMarketHeight / 2 + 47}
                type={item.background}
                center
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  key={`BlackMarket-Building-${item.x}-${item.y}`}
                  x={28 + item.x * buildingBackgroundDist}
                  y={blackMarketHeight / 2 + 47}
                  buildingInfo={item.building}
                  center
                />
              )}
            </React.Fragment>
          );
        }
      })}
    </Group>
  );
};
