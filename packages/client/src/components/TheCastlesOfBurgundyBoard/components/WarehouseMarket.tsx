import { Group } from "react-konva";
import { StateEnum, type BlackMarketType } from "@game/shared";
import { BuildingBackground } from "./BuildingBackground";
import { useContext } from "react";
import { TheCastlesOfBurgundyGameContext } from "../../../store/TheCastlesOfBurgundyGameContext";

interface Props {
  x: number;
  y: number;
  number: number;
}

export const WarehouseMarket = ({ x, y, number }: Props) => {
  const gameData = useContext(TheCastlesOfBurgundyGameContext);
  const warehouseMarketWidth = 109;
  const warehouseMarketHeight = 125;
  const buildingBackgroundDist = 56;
  let warehouseMarket: BlackMarketType[] = [];
  switch (number) {
    case 1:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketOne;
      break;
    case 2:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketTwo;
      break;
    case 3:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketThree;
      break;
    case 4:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketFour;
      break;
    case 5:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketFive;
      break;
    case 6:
      warehouseMarket = gameData.G.mainBoardInfo.warehouseMarketSix;
      break;
  }
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
          return <BuildingBackground x={item.x * buildingBackgroundDist} y={0} type={item.background} />;
        } else if (item.y === 1) {
          return <BuildingBackground x={item.x * buildingBackgroundDist} y={65} type={item.background} />;
        }
      })}
    </Group>
  );
};
