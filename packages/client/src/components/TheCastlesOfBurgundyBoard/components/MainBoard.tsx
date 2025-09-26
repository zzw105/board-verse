import { Image, Group, Circle } from "react-konva";
import { useContext, useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import mainBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/mainBoard.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { BlackMarket } from "./BlackMarket";
import { WarehouseMarket } from "./WarehouseMarket";
import { Cargo } from "./Cargo";
import { TheCastlesOfBurgundyGameContext } from "../../../store/TheCastlesOfBurgundyGameContext";
import { StateEnum } from "@game/shared";
import { Dice } from "./Dice";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const MainBoard = ({ x, y, draggable, onDragEnd }: Props) => {
  const gameData = useContext(TheCastlesOfBurgundyGameContext);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  // useEffect(() => {
  //   const g = groupRef.current;
  //   if (!g) return;
  //   g.cache();
  // }, []);

  const [mainBoardImage] = useImage(mainBoardImg);
  const mainBoardImageWidth = 1172; // 从文件中获取写死
  const mainBoardImageHeight = 1170; // 从文件中获取写死
  const mainBoardImageScale = 0.6;

  const warehouseMarketPos = [
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale - 282,
    },
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale + 280,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale - 79,
    },
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale + 280,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale + 79,
    },
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale + 282,
    },
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale - 280,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale + 79,
    },
    {
      x: (mainBoardImageWidth / 2) * mainBoardImageScale - 280,
      y: (mainBoardImageHeight / 2) * mainBoardImageScale - 79,
    },
  ];

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <Image
        width={mainBoardImageWidth}
        height={mainBoardImageHeight}
        scale={{ x: mainBoardImageScale, y: mainBoardImageScale }}
        image={mainBoardImage}
        shadowBlur={ShadowBlurEnum.MAIN}
      />
      <BlackMarket
        x={(mainBoardImageWidth / 2) * mainBoardImageScale}
        y={(mainBoardImageHeight / 2) * mainBoardImageScale}
      />
      {warehouseMarketPos.map((item, index) => (
        <WarehouseMarket key={"WarehouseMarket" + index} x={item.x} y={item.y} number={index + 1} />
      ))}

      {gameData.G.mainBoardInfo.nowCargos.map((item, index) => {
        if (item.point === StateEnum.EMPTY) {
          return null;
        }
        return <Cargo key={"Cargo" + index} x={4 + index * 54} y={106} cargoInfo={item} />;
      })}

      <Circle
        x={87 + (gameData.G.currentTurn - 1) * 41} // 圆心 x 坐标
        y={23} // 圆心 y 坐标
        radius={20} // 圆半径
        stroke="red" // 描边颜色
        strokeWidth={3} // 描边宽度
        fill="" // 空心圆
      />
      <Dice x={20} y={30} point={gameData.G.mainBoardInfo.dice} type={4}></Dice>
    </Group>
  );
};
