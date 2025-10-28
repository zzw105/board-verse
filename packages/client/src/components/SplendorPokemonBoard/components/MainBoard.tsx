import { useContext, useEffect, useRef } from "react";

import Konva from "konva";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import mainBoardImg from "../../../assets/splendorPokemon/img/table/table_3.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { SP_GameContext } from "../../../store/SplendorPokemonContext";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const MainBoard = ({ x, y, draggable, onDragEnd }: Props) => {
  const { gameData } = useContext(SP_GameContext);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  const [mainBoardImage] = useImage(mainBoardImg);
  const mainBoardImageWidth = 7500; // 从文件中获取写死
  const mainBoardImageHeight = 5300; // 从文件中获取写死
  const mainBoardImageScale = 0.08;

  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.cache();
  }, [mainBoardImage]);

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <Image
        width={mainBoardImageWidth}
        height={mainBoardImageHeight}
        scale={{ x: mainBoardImageScale, y: mainBoardImageScale }}
        image={mainBoardImage}
        shadowBlur={ShadowBlurEnum.MAIN}
      />
    </Group>
  );
};
