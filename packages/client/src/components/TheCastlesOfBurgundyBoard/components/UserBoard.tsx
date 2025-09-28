import { useContext, useRef } from "react";
import React from "react";

import { type PlayersInfoType, StateEnum } from "@game/shared";
import type { FilteredMetadata } from "boardgame.io";
import Konva from "konva";
import { Group, Image, Star, Text } from "react-konva";
import useImage from "use-image";

import countersImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/counters.png";
import plBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/plBoard.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { BoardContext, UserBoardContext } from "../../../store/BoardContext";
import { getCurrentPlayer } from "../../../utils";
import { Building } from "./Building";
import { Cargo } from "./Cargo";
import { Dice } from "./Dice";
import { PointBuildingBackground } from "./PointBuildingBackground";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  playerInfo: PlayersInfoType;
  matchData: FilteredMetadata[number];
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const UserBoard = ({ x, y, draggable, playerInfo, matchData, onDragEnd }: Props) => {
  const { gameData } = useContext(BoardContext);
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

  const isHighlight = playerInfo.id === getCurrentPlayer(gameData);

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <UserBoardContext.Provider
        value={{
          boardPlayerInfo: playerInfo,
        }}
      >
        {/* 玩家面板 */}
        <Image
          width={plBoardImageWidth}
          height={plBoardImageHeight}
          scale={{ x: plBoardImageScale, y: plBoardImageScale }}
          image={plBoardImage}
          shadowBlur={ShadowBlurEnum.MAIN}
          shadowColor={isHighlight ? "red" : "black"}
        />
        {/* 版图 */}
        {playerInfo.territory.map((item) => {
          if (item.background === StateEnum.EMPTY) {
            return null;
          }
          return (
            <React.Fragment key={`UserBoard-${playerInfo.id}-${item.x}-${item.y}`}>
              <PointBuildingBackground
                x={118.5 + item.x * 56.1 + (item.y % 2) * -28}
                y={129.8 + item.y * 48}
                type={item.background}
                point={item.pointNum}
                center
              />
              {item.building !== StateEnum.EMPTY && (
                <Building
                  x={118.5 + item.x * 56.1 + (item.y % 2) * -28}
                  y={129.8 + item.y * 48}
                  buildingInfo={item.building}
                  center
                />
              )}
            </React.Fragment>
          );
        })}
        {/* 骰子 */}
        {playerInfo.dices?.map((item, index) => {
          return (
            <Dice
              key={`Dice-${matchData.id}-${playerInfo.id}-${index}`}
              id={`Dice-${matchData.id}-${playerInfo.id}-${index}`}
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
      </UserBoardContext.Provider>
    </Group>
  );
};
