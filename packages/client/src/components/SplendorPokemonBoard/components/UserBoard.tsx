import { useContext, useRef } from "react";

import { SP_CardObj, SP_ColorEnumList, type SP_PlayerInfoType, takeMany } from "@game/shared";
import { message } from "antd";
import type { FilteredMetadata } from "boardgame.io";
import Konva from "konva";
import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";

import plBoardImg from "../../../assets/splendorPokemon/img/table/table_2.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { SP_GameContext, SP_UserContextType } from "../../../store/SplendorPokemonContext";

interface Props {
  x: number;
  y: number;
  draggable?: boolean;
  boardPlayerInfo: SP_PlayerInfoType;
  matchData: FilteredMetadata[number];
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const UserBoard = ({ x, y, draggable, boardPlayerInfo, matchData, onDragEnd }: Props) => {
  const { nowPlayingPlayerID, clientPlayerID, clientPlayerInfo, gameData, allItemPosition } =
    useContext(SP_GameContext);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  const [plBoardImage] = useImage(plBoardImg);
  const s = 12.5;
  const plBoardImageWidth = 6900 / s; // 从文件中获取写死
  const plBoardImageHeight = 4260 / s; // 从文件中获取写死
  const plBoardImageScale = 0.08 * s;

  // const isHighlight = boardPlayerInfo.id === nowPlayingPlayerID;

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
        ></Image>
      </SP_UserContextType.Provider>
      <Group x={0} y={-40}>
        <Rect
          width={plBoardImageWidth}
          height={40}
          fill="#00000059"
          cornerRadius={8}
          shadowColor="black"
          shadowBlur={4}
          shadowOffset={{ x: 2, y: 2 }}
          shadowOpacity={0.3}
        />
        <Text x={10} text={`用户名：${matchData.name}`} fontSize={16} fill="white" height={40} verticalAlign="middle" />
        <Text
          x={plBoardImageWidth - 70}
          text={`分数：${boardPlayerInfo.point}`}
          fontSize={16}
          fill="white"
          height={40}
          verticalAlign="middle"
        />
      </Group>
      <Group x={-100} y={0}>
        <Rect
          width={100}
          height={plBoardImageHeight}
          fill="#00000059"
          cornerRadius={8}
          shadowColor="black"
          shadowBlur={4}
          shadowOffset={{ x: 2, y: 2 }}
          shadowOpacity={0.3}
        />
        <Text
          x={10}
          text={`精灵球：${boardPlayerInfo.tokenColor.red + boardPlayerInfo.tokenColor.blue + boardPlayerInfo.tokenColor.black + boardPlayerInfo.tokenColor.pink + boardPlayerInfo.tokenColor.yellow + boardPlayerInfo.tokenColor.purple}`}
          fontSize={16}
          fill="white"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={22}
          text={`红：${boardPlayerInfo.tokenColor.red}`}
          fontSize={16}
          fill="#ff4545ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={44}
          text={`蓝：${boardPlayerInfo.tokenColor.blue}`}
          fontSize={16}
          fill="#4592ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={66}
          text={`黑：${boardPlayerInfo.tokenColor.black}`}
          fontSize={16}
          fill="#454545ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={88}
          text={`粉：${boardPlayerInfo.tokenColor.pink}`}
          fontSize={16}
          fill="#ff84adff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={110}
          text={`黄：${boardPlayerInfo.tokenColor.yellow}`}
          fontSize={16}
          fill="#ffd645ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={132}
          text={`紫：${boardPlayerInfo.tokenColor.purple}`}
          fontSize={16}
          fill="#b682ffff"
          height={40}
          verticalAlign="middle"
        />
        {/*  */}
        <Text
          x={10}
          y={180}
          text={`宝可梦：${boardPlayerInfo.cardColor.red + boardPlayerInfo.cardColor.blue + boardPlayerInfo.cardColor.black + boardPlayerInfo.cardColor.pink + boardPlayerInfo.cardColor.yellow + boardPlayerInfo.cardColor.purple}`}
          fontSize={16}
          fill="#ffffffff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={202}
          text={`红：${boardPlayerInfo.cardColor.red}`}
          fontSize={16}
          fill="#ff4545ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={224}
          text={`蓝：${boardPlayerInfo.cardColor.blue}`}
          fontSize={16}
          fill="#4592ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={246}
          text={`黑：${boardPlayerInfo.cardColor.black}`}
          fontSize={16}
          fill="#454545ff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={268}
          text={`粉：${boardPlayerInfo.cardColor.pink}`}
          fontSize={16}
          fill="#ff84adff"
          height={40}
          verticalAlign="middle"
        />
        <Text
          x={13}
          y={290}
          text={`黄：${boardPlayerInfo.cardColor.yellow}`}
          fontSize={16}
          fill="#ffd645ff"
          height={40}
          verticalAlign="middle"
        />
      </Group>
      <Group x={0} y={plBoardImageHeight}>
        <Rect
          width={plBoardImageWidth}
          height={100}
          fill="#00000059"
          cornerRadius={8}
          shadowColor="black"
          shadowBlur={4}
          shadowOffset={{ x: 2, y: 2 }}
          shadowOpacity={0.3}
        />
      </Group>
      {/* \boardPlayerInfo.id === clientPlayerID && */}
      <Group x={plBoardImageWidth} y={0}>
        <Rect
          width={100}
          height={plBoardImageHeight}
          fill="#00000059"
          cornerRadius={8}
          shadowColor="black"
          shadowBlur={4}
          shadowOffset={{ x: 2, y: 2 }}
          shadowOpacity={0.3}
        />
        {boardPlayerInfo.id === clientPlayerID && nowPlayingPlayerID === clientPlayerID && (
          <>
            {boardPlayerInfo.provisionalTokens.length > 0 && (
              <Group
                x={0}
                y={plBoardImageHeight - 81}
                onMouseOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseOut={() => {
                  document.body.style.cursor = "default";
                }}
                onClick={() => {
                  gameData.moves.prospectiveConfirmationSelectionTokenMove();
                  document.body.style.cursor = "default";
                }}
              >
                <Rect
                  width={100}
                  height={40}
                  fill="#1677ff"
                  cornerRadius={8}
                  shadowColor="black"
                  shadowBlur={4}
                  shadowOffset={{ x: 2, y: 2 }}
                  shadowOpacity={0.3}
                />
                <Text
                  text={"确认选择"}
                  fontSize={16}
                  fill="white"
                  width={100}
                  height={40}
                  align="center"
                  verticalAlign="middle"
                />
              </Group>
            )}
            {boardPlayerInfo.provisionalCards.length > 0 && (
              <>
                {allItemPosition.cards[boardPlayerInfo.provisionalCards[0]].isFaceUp && (
                  <>
                    <Group
                      x={0}
                      y={plBoardImageHeight - 163}
                      onMouseOver={() => {
                        document.body.style.cursor = "pointer";
                      }}
                      onMouseOut={() => {
                        document.body.style.cursor = "default";
                      }}
                      onClick={() => {
                        gameData.moves.prospectiveConfirmationSelectionCardMove();
                        document.body.style.cursor = "default";
                      }}
                    >
                      <Rect
                        width={100}
                        height={40}
                        fill="#1677ff"
                        cornerRadius={8}
                        shadowColor="black"
                        shadowBlur={4}
                        shadowOffset={{ x: 2, y: 2 }}
                        shadowOpacity={0.3}
                      />
                      <Text
                        text={"购买"}
                        fontSize={16}
                        fill="white"
                        width={100}
                        height={40}
                        align="center"
                        verticalAlign="middle"
                      />
                    </Group>
                    <Group
                      x={0}
                      y={plBoardImageHeight - 122}
                      onMouseOver={() => {
                        document.body.style.cursor = "pointer";
                      }}
                      onMouseOut={() => {
                        document.body.style.cursor = "default";
                      }}
                      onClick={() => {
                        const cardId = clientPlayerInfo.provisionalCards[0];
                        for (const playCardId of clientPlayerInfo.cards) {
                          const playCardInfo = SP_CardObj[playCardId];
                          if (playCardInfo.evolvesTo.includes(cardId)) {
                            const canEvolution = SP_ColorEnumList.some(
                              (color) => clientPlayerInfo.cardColor[color] >= playCardInfo.cost[color],
                            );
                            if (canEvolution) {
                              gameData.moves.prospectiveConfirmationEvolutionCardMove();
                              document.body.style.cursor = "default";

                              return;
                            }
                          }
                        }
                        document.body.style.cursor = "default";
                        message.error("无法进化");
                      }}
                    >
                      <Rect
                        width={100}
                        height={40}
                        fill="white"
                        cornerRadius={8}
                        shadowColor="black"
                        shadowBlur={4}
                        shadowOffset={{ x: 2, y: 2 }}
                        shadowOpacity={0.3}
                      />
                      <Text
                        text={"进化"}
                        fontSize={16}
                        fill="black"
                        width={100}
                        height={40}
                        align="center"
                        verticalAlign="middle"
                      />
                    </Group>
                  </>
                )}
                <Group
                  x={0}
                  y={plBoardImageHeight - 81}
                  onMouseOver={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onMouseOut={() => {
                    document.body.style.cursor = "default";
                  }}
                  onClick={() => {
                    if (boardPlayerInfo.lockedCards.includes(boardPlayerInfo.provisionalCards[0])) {
                      message.error("该卡牌已锁定无法重新锁定");
                    } else {
                      gameData.moves.prospectiveConfirmationLockCardMove();
                    }
                    document.body.style.cursor = "default";
                  }}
                >
                  <Rect
                    width={100}
                    height={40}
                    fill="white"
                    cornerRadius={8}
                    shadowColor="black"
                    shadowBlur={4}
                    shadowOffset={{ x: 2, y: 2 }}
                    shadowOpacity={0.3}
                  />
                  <Text
                    text={"锁定"}
                    fontSize={16}
                    fill="black"
                    width={100}
                    height={40}
                    align="center"
                    verticalAlign="middle"
                  />
                </Group>
              </>
            )}
            {(boardPlayerInfo.provisionalTokens.length > 0 || boardPlayerInfo.provisionalCards.length > 0) && (
              <Group
                x={0}
                y={plBoardImageHeight - 40}
                onMouseOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseOut={() => {
                  document.body.style.cursor = "default";
                }}
                onClick={() => {
                  gameData.moves.cleanProvisionalMove();
                  document.body.style.cursor = "default";
                }}
              >
                <Rect
                  width={100}
                  height={40}
                  fill="white"
                  cornerRadius={8}
                  shadowColor="black"
                  shadowBlur={4}
                  shadowOffset={{ x: 2, y: 2 }}
                  shadowOpacity={0.3}
                />
                <Text
                  text={"清空"}
                  fontSize={16}
                  fill="black"
                  width={100}
                  height={40}
                  align="center"
                  verticalAlign="middle"
                />
              </Group>
            )}
          </>
        )}
      </Group>

      {/* {stagesType === "getNewDice" && (
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
