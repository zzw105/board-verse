import { Image, Group, Text, Star } from "react-konva";
import { useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import plBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/plBoard.jpg";
import countersImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/counters.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { StateEnum, type PlayersInfoType } from "@game/shared";
import type { FilteredMetadata } from "boardgame.io";
import { PointBuildingBackground } from "./PointBuildingBackground";
import { Dice } from "./Dice";
import { Cargo } from "./Cargo";
import { useDebugStore } from "../../../store/useDebugStore";

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

  const [countersImage] = useImage(countersImg);
  const countersImageWidth = 336 / 6; // 从文件中获取写死
  const countersImageHeight = 92; // 从文件中获取写死
  const countersImageScale = 0.4;

  const { debugNum1, debugNum2, debugNum3, debugNum4, debugNum5 } = useDebugStore();

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      {/* 玩家面板 */}
      <Image
        width={plBoardImageWidth}
        height={plBoardImageHeight}
        scale={{ x: plBoardImageScale, y: plBoardImageScale }}
        image={plBoardImage}
        shadowBlur={ShadowBlurEnum.MAIN}
      />
      {/* 版图 */}
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
      {/* 骰子 */}
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
      {/* 工人 */}
      <Image
        x={20}
        y={60}
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
      <Text x={50} y={65} text={playerInfo.workers.toString()} fontSize={30} fill="black" />
      {/* 银币 */}
      <Image
        x={20}
        y={105}
        image={countersImage}
        shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
        width={countersImageWidth}
        height={countersImageHeight}
        scale={{ x: countersImageScale, y: countersImageScale }}
        crop={{
          x: 1 * countersImageWidth,
          y: 0 * countersImageHeight,
          width: countersImageWidth,
          height: countersImageHeight,
        }}
      />
      <Text x={50} y={110} text={playerInfo.coins.toString()} fontSize={30} fill="black" />
      {/* 分数 */}
      <Star
        x={335}
        y={130}
        numPoints={5}
        innerRadius={6.5}
        outerRadius={6.5 * 2}
        fill="yellow"
        stroke="black"
        strokeWidth={1}
      />
      <Text x={355} y={119} text={playerInfo.score.toString()} fontSize={25} fill="black" />
      {/* 货物 */}
      {playerInfo.cargos.map((cargoList, index) => {
        return cargoList.map((cargo, i) => {
          return (
            <Cargo
              key={`Cargo-${matchData.id}-${playerInfo.id}-${index}-${i}`}
              x={20 + index * 55}
              y={9 - i * 7}
              imageScale={0.55}
              cargoInfo={cargo}
            />
          );
        });
      })}
    </Group>
  );
};
