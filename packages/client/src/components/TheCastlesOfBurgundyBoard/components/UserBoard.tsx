import { Image, Group } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import plBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/plBoard.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { StateEnum, type PlayersInfoType } from "@game/shared";
import type { FilteredMetadata } from "boardgame.io";
import { PointBuildingBackground } from "./PointBuildingBackground";
import { Dice } from "./Dice";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  playerInfo: PlayersInfoType;
  matchData: FilteredMetadata[number];
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const UserBoard = ({ x, y, draggable, playerInfo, matchData, onDragEnd }: Props) => {
  // const gameData = useContext(TheCastlesOfBurgundyGameContext);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);

  const [plBoardImage] = useImage(plBoardImg);
  const plBoardImageWidth = 722; // 从文件中获取写死
  const plBoardImageHeight = 1016; // 从文件中获取写死
  const plBoardImageScale = 0.56;

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <Image
        width={plBoardImageWidth}
        height={plBoardImageHeight}
        scale={{ x: plBoardImageScale, y: plBoardImageScale }}
        image={plBoardImage}
        shadowBlur={ShadowBlurEnum.MAIN}
      />
      {playerInfo.territory.map((item) => {
        if (item.background === StateEnum.EMPTY) {
          return null;
        }
        return (
          <PointBuildingBackground
            key={`PointBuildingBackground-${matchData.id}-${item.x}-${item.y}`}
            x={118.5 + item.x * 56.1 + (item.y % 2) * -28}
            y={129.8 + item.y * 48}
            type={item.background}
            point={item.pointNum}
            center
          />
        );
      })}
      {playerInfo.dices?.map((item, index) => {
        return (
          <Dice
            key={`Dice-${matchData.id}-${playerInfo.id}-${index}`}
            x={255 + (item.isUse ? 1 : 0) * 80}
            y={10 + index * 40}
            point={item.point}
            type={playerInfo.id}
          />
        );
      })}
    </Group>
  );
};
