import { Image, Group } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import mainBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/mainBoard.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { BlackMarket } from "./BlackMarket";
import { WarehouseMarket } from "./WarehouseMarket";

interface SpriteImageProps {
  x: number;
  y: number;
  draggable?: boolean;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const MainBoard = ({ x, y, draggable, onDragEnd }: SpriteImageProps) => {
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

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      draggable={draggable}
      onDragEnd={onDragEnd}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
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
      <WarehouseMarket x={(mainBoardImageWidth / 2) * mainBoardImageScale} y={65} number={1} />
    </Group>
  );
};
