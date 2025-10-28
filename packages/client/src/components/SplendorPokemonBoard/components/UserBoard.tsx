import { useContext, useRef } from "react";
import React from "react";

import { type PlayersInfoType, type SP_PlayerInfoType, StateEnum } from "@game/shared";
import { message } from "antd";
import type { FilteredMetadata } from "boardgame.io";
import Konva from "konva";
import { Group, Image, Rect, Star, Text } from "react-konva";
import useImage from "use-image";

import plBoardImg from "../../../assets/splendorPokemon/img/table/table_2.png";
import { ShadowBlurEnum, ShadowColorEnum } from "../../../enum/game";
import { BoardContext, UserBoardContext } from "../../../store/BoardContext";
import { SP_UserContextType } from "../../../store/SplendorPokemonContext";
import { useTheCastlesOfBurgundyStore } from "../../../store/useTheCastlesOfBurgundyStore";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  boardPlayerInfo: SP_PlayerInfoType;
  matchData: FilteredMetadata[number];
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const UserBoard = ({ x, y, draggable, boardPlayerInfo, matchData, onDragEnd }: Props) => {
  const { nowPlayingPlayerID } = useContext(BoardContext);

  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  const [plBoardImage] = useImage(plBoardImg);
  const plBoardImageWidth = 6900; // 从文件中获取写死
  const plBoardImageHeight = 4260; // 从文件中获取写死
  const plBoardImageScale = 0.08;

  const isHighlight = boardPlayerInfo.id === nowPlayingPlayerID;

  return (
    <Group ref={groupRef} x={x} y={y} draggable={draggable} onDragEnd={onDragEnd}>
      <SP_UserContextType.Provider
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
        ></Image>
      </SP_UserContextType.Provider>
      {/* 回合结束按钮 */}
      {/* {isHighlight && nowPlayingPlayerID === clientPlayerID && (
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
      {stagesType === "getNewDice" && (
        <Group x={305} y={480}>
          <Rect
            width={100}
            height={40}
            fill="green"
            cornerRadius={8}
            shadowColor="black"
            shadowBlur={4}
            shadowOffset={{ x: 2, y: 2 }}
            shadowOpacity={0.3}
          />
          <Text
            text={"自选骰子"}
            fontSize={16}
            fill="white"
            width={100}
            height={40}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      )} */}
    </Group>
  );
};
