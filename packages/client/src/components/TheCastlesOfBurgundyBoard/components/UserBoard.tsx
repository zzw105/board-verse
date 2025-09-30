import { useContext, useRef } from "react";
import React from "react";

import { type PlayersInfoType, StateEnum } from "@game/shared";
import { message } from "antd";
import type { FilteredMetadata } from "boardgame.io";
import Konva from "konva";
import { Group, Image, Rect, Star, Text } from "react-konva";
import useImage from "use-image";

import countersImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/counters.png";
import plBoardImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/plBoard.jpg";
import { ShadowBlurEnum, ShadowColorEnum } from "../../../enum/game";
import { BoardContext, UserBoardContext } from "../../../store/BoardContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";
import { afterUseDice } from "../../../utils";
import { Building } from "./Building";
import { Cargo } from "./Cargo";
import { Dice } from "./Dice";
import { PointBuildingBackground } from "./PointBuildingBackground";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  boardPlayerInfo: PlayersInfoType;
  matchData: FilteredMetadata[number];
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const UserBoard = ({ x, y, draggable, boardPlayerInfo, matchData, onDragEnd }: Props) => {
  const { gameData, nowPlayingPlayerID, clientPlayerID } = useContext(BoardContext);
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

  const isHighlight = boardPlayerInfo.id === nowPlayingPlayerID;

  const { choiceDice, setChoiceDice, cleanChoiceDice } = useTheCastlesOfBurgundyStore();
  const onBtnClick = () => {
    gameData.moves.endPlayerTurn();
    afterUseDice();
  };
  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <UserBoardContext.Provider
        value={{
          boardPlayerInfo: boardPlayerInfo,
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
        {boardPlayerInfo.territory.map((item) => {
          if (item.background === StateEnum.EMPTY) {
            return null;
          }
          return (
            <React.Fragment key={`UserBoard-${boardPlayerInfo.id}-${item.x}-${item.y}`}>
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
        {boardPlayerInfo.dices?.map((item, index) => {
          const id = `Dice-${matchData.id}-${boardPlayerInfo.id}-${index}`;
          const selectable =
            nowPlayingPlayerID === clientPlayerID && clientPlayerID === boardPlayerInfo.id && !item.isUse;
          const selected = choiceDice.id === id;
          return (
            <Dice
              key={id}
              x={255 + (item.isUse ? 1 : 0) * 80}
              y={10 + index * 40}
              diceInfoType={item}
              type={boardPlayerInfo.id}
              selected={selected}
              selectable={selectable}
              onSelect={() => {
                if (choiceDice.dicePoint === StateEnum.EMPTY) {
                  setChoiceDice({ playerId: clientPlayerID, dicePoint: item.point, id });
                  message.info(`选择了 ${item.point}点 骰子，请选择对应操作`);
                } else {
                  cleanChoiceDice();
                }
              }}
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
        <Text x={50} y={65} text={boardPlayerInfo.workers.toString()} fontSize={30} fill="black" />
        {isHighlight && nowPlayingPlayerID === clientPlayerID && choiceDice.dicePoint !== StateEnum.EMPTY && (
          <>
            <Text x={70} y={68} text={"+2"} fontSize={25} fill="black" />
            <Rect
              x={70}
              y={68}
              width={30}
              height={25}
              stroke={ShadowColorEnum.CAN_OPERATE} // 描边颜色
              strokeWidth={4} // 描边宽度
              onMouseOver={() => {
                document.body.style.cursor = "pointer";
              }}
              onMouseOut={() => {
                document.body.style.cursor = "default";
              }}
              onClick={() => {
                gameData.moves.getWorkerMove(choiceDice.dicePoint);
                afterUseDice("成功获取2个工人");
              }}
            />
          </>
        )}
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
        <Text x={50} y={110} text={boardPlayerInfo.coins.toString()} fontSize={30} fill="black" />
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
        <Text x={355} y={119} text={boardPlayerInfo.score.toString()} fontSize={25} fill="black" />
        {/* 货物 */}
        {boardPlayerInfo.cargos.map((cargoList, index) => {
          return cargoList.map((cargo, i) => {
            const selectable =
              isHighlight && nowPlayingPlayerID === clientPlayerID && choiceDice.dicePoint === cargo.point;
            return (
              <Cargo
                key={`Cargo-${matchData.id}-${boardPlayerInfo.id}-${index}-${i}`}
                x={20 + index * 55}
                y={9 - i * 7}
                imageScale={0.55}
                cargoInfo={cargo}
                selectable={selectable}
                onSelect={() => {
                  gameData.moves.sellCargoMove(cargo.point);
                  afterUseDice("成功出售货物");
                }}
              />
            );
          });
        })}
        {/* 建筑 */}
        {boardPlayerInfo.buildings.map((building, index) => (
          <Building key={building.id} x={21 + index * 60.5} y={467} buildingInfo={building} />
        ))}
      </UserBoardContext.Provider>
      {isHighlight && nowPlayingPlayerID === clientPlayerID && (
        <Group
          x={305}
          y={530}
          onClick={onBtnClick}
          onMouseOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onMouseOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <Rect
            width={100}
            height={40}
            fill="red"
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={4}
            shadowOffset={{ x: 2, y: 2 }}
            shadowOpacity={0.3}
          />
          <Text
            text={"回合结束"}
            fontSize={16}
            fill="white"
            width={100}
            height={40}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      )}
    </Group>
  );
};
