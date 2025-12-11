import { useEffect, useRef, useState } from "react";

import { SP_CardIdList, SP_ColorEnum, type SP_GameType, SP_TokenIdList, SP_TokenObj } from "@game/shared";
import { Button, InputNumber, Slider, message } from "antd";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import type Konva from "konva";
import { cloneDeep } from "lodash";
import { Layer, Rect, Stage } from "react-konva";
import { useNavigate } from "react-router-dom";
import useImage from "use-image";

import backMainImg from "../../assets/theCastlesOfBurgundyMonorepo/imgs/back-main.jpg";
import { SP_GameContext } from "../../store/SplendorPokemonContext";
import { useDebugStore } from "../../store/useDebugStore";
import { use_SP_Store } from "../../store/useSplendorPokemonStore";
import { useUserStore } from "../../store/useUserStore";
import styles from "./SplendorPokemonBoard.module.less";
import { MainBoard } from "./components/MainBoard";
import { PokemonBall } from "./components/PokemonBall";
import { PokemonCard } from "./components/PokemonCard";
import { TextBox } from "./components/TextBox";
import { Tooltip } from "./components/Tooltip";
import { UserBoard } from "./components/UserBoard";
import { type AllItemPositionType, setMainBoardTokenCardPos, setUserBoardTokenCardPos } from "./utils";

export function SplendorPokemonBoard(gameData: BoardProps<SP_GameType>) {
  const {
    debugNum1,
    debugNum2,
    debugNum3,
    debugNum4,
    debugNum5,
    setDebugNum1,
    setDebugNum2,
    setDebugNum3,
    setDebugNum4,
    setDebugNum5,
  } = useDebugStore();

  console.log({ gameData });
  const clientPlayerID = +(gameData.playerID ?? -1);
  const clientPlayerInfo = gameData.G.playersInfo[+(gameData.playerID ?? -1)];
  const nowPlayingPlayerID = +gameData.ctx.currentPlayer;
  const nowPlayingPlayerInfo = gameData.G.playersInfo[+gameData.ctx.currentPlayer];
  /* hook */
  const navigate = useNavigate();
  const { name } = useUserStore();
  // useGameLogs(gameData.G.logs);

  const { stagesType, setStagesType } = use_SP_Store();

  const nowStagesType = (gameData.playerID !== null && gameData.ctx.activePlayers?.[gameData.playerID]) || undefined;
  useEffect(() => {
    if (stagesType !== nowStagesType) {
      setStagesType(nowStagesType);
      if (nowStagesType === "discard") {
        message.warning("当前阶段为弃精灵球阶段，请选择精灵球丢弃");
      }
    }
  }, [nowStagesType, stagesType, setStagesType]);

  /* 全局需要保存的位置缩放相关数据 */
  /* stage画布 */
  const stageRef = useRef<Konva.Stage>(null);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const setStagePositionLocal = (pos: { x: number; y: number }) => {
    localStorage.setItem("stagePosition", JSON.stringify(pos));
    setStagePosition(pos);
  };
  const setStageScaleLocal = (scale: number) => {
    localStorage.setItem("stageScale", JSON.stringify(scale));
    setStageScale(scale);
  };
  // stage滚轮
  const handleStageWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (pointer?.x === undefined || pointer?.y === undefined) {
      return;
    }
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    let direction = e.evt.deltaY > 0 ? 1 : -1;
    if (e.evt.ctrlKey) {
      direction = -direction;
    }
    const scaleBy = 1.04;
    const newScale = +(direction > 0 ? oldScale * scaleBy : oldScale / scaleBy).toFixed(2);
    setStageScaleLocal(newScale);
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setStagePositionLocal(newPos);
  };
  // stage拖动结束
  const handleStageDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    // console.log(222);
    const { x, y } = e.target.position();
    setStagePositionLocal({ x, y });
  };
  /* 可拖动图形组件 */
  const initShapes = [
    { id: "MainBoard", x: 690, y: 10 },
    { id: "UserBoard0", x: 10, y: 10 },
    { id: "UserBoard1", x: 1210, y: 10 },
    { id: "UserBoard2", x: 200, y: 470 },
    { id: "UserBoard3", x: 1000, y: 470 },
  ];
  const [shapes, setShapes] = useState(cloneDeep(initShapes));
  const setShapesLocal = (newShapes: typeof shapes) => {
    localStorage.setItem("shapes", JSON.stringify(newShapes));
    setShapes(newShapes);
  };
  // 可拖动图形组件拖动结束
  const handleShapesDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    e.cancelBubble = true;
    const { x, y } = e.target.position();
    const newShapes = shapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape));
    setShapesLocal(newShapes);
  };
  // 可拖动图形组件缩放
  const handleSliderChange = (value: number | null) => {
    if (Number.isNaN(value)) {
      return;
    }
    setStageScaleLocal(value ?? 0);
  };
  // 恢复数据
  useEffect(() => {
    const savedShapes = localStorage.getItem("shapes");
    const savedStageScale = localStorage.getItem("stageScale");
    const savedStagePosition = localStorage.getItem("stagePosition");
    if (savedStagePosition) {
      setStagePosition(JSON.parse(savedStagePosition));
    }
    if (savedStageScale) {
      setStageScale(JSON.parse(savedStageScale));
    }
    if (savedShapes) {
      setShapes(JSON.parse(savedShapes));
    }
  }, []);

  // konva外部容器
  const konvaRef = useRef<HTMLDivElement>(null);
  // 画布尺寸
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });
  // 动态修改画布尺寸
  useEffect(() => {
    const updateSize = () => {
      if (konvaRef.current) {
        setStageSize({
          width: konvaRef.current.offsetWidth,
          height: konvaRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const initialTokensPosition: AllItemPositionType = {
    cards: SP_CardIdList.reduce(
      (acc, key) => {
        acc[key] = {
          x: 0,
          y: 0,
          isFaceUp: true,
          isHorizontal: false,
          isShow: false,
          pos: "main",
          isProvisional: false,
        };
        return acc;
      },
      {} as AllItemPositionType["cards"],
    ),
    tokens: SP_TokenIdList.reduce(
      (acc, key) => {
        acc[key] = { x: 0, y: 0, isShow: false, pos: "main", isProvisional: false };
        return acc;
      },
      {} as AllItemPositionType["tokens"],
    ),
  };
  const [allItemPosition, setAllItemPosition] = useState<AllItemPositionType>(initialTokensPosition);

  useEffect(() => {
    setMainBoardTokenCardPos(gameData, allItemPosition, shapes);
    //
    setUserBoardTokenCardPos(gameData, allItemPosition, shapes);
    //
    // const nowPlayingPlayerBoard = shapes.find((shape) => shape.id === `UserBoard${nowPlayingPlayerID}`)!;
    // provisionalTokenDistrict.forEach((token, index) => {
    //   const tokenPosInfo = allItemPosition.tokens[token];
    //   tokenPosInfo.x = nowPlayingPlayerBoard.x + debugNum1;
    //   tokenPosInfo.y = nowPlayingPlayerBoard.y + debugNum2 + index * debugNum3;
    //   tokenPosInfo.isShow = true;
    // });
    setAllItemPosition({ ...allItemPosition });
  }, [gameData, shapes]);

  const [backMainImage] = useImage(backMainImg);

  const getNowStages = () => {
    if (nowStagesType === "discard") {
      return "弃球阶段";
    } else if (nowStagesType === "evolution") {
      return "进化阶段";
    } else {
      return "购买阶段";
    }
  };

  return (
    <div className={styles.board}>
      {process.env.NODE_ENV === "development" && (
        <div className={styles.devBox}>
          <div className={`${styles.top} ${styles.nowUserName}`}>
            <div>当前玩家：{gameData.matchData?.[nowPlayingPlayerID].name || "未知玩家"}</div>
            <div>阶段：{getNowStages()}</div>
          </div>
          {clientPlayerID === nowPlayingPlayerID && (
            <div className={`${styles.top} ${styles.end}`}>
              <Button color="danger" variant="solid" onClick={() => gameData.moves.endTurnMove()}>
                结束回合
              </Button>
            </div>
          )}
          <div className={styles.title}>
            {name}
            <Button
              size="large"
              onClick={() => {
                gameData.moves.gameReset();
              }}
            >
              重置游戏
            </Button>
            <Button
              size="large"
              onClick={() => {
                setStagePositionLocal({ x: 0, y: 0 });
                setStageScaleLocal(1);
                setShapesLocal(cloneDeep(initShapes));
              }}
            >
              重置画布
            </Button>
            <Button
              size="large"
              onClick={() => {
                navigate("/");
              }}
            >
              返回
            </Button>
            <div>
              当前玩家
              {gameData.matchData?.find((item) => item.id === +gameData.ctx.currentPlayer)?.name}
            </div>
            <Slider min={0} max={3} onChange={handleSliderChange} value={stageScale} step={0.01} />
            <InputNumber
              min={0}
              max={3}
              style={{ margin: "0 16px" }}
              step={0.01}
              value={stageScale}
              onChange={handleSliderChange}
            />
            <div>
              调试1
              <InputNumber step={0.01} value={debugNum1} onChange={(e) => setDebugNum1(e ?? 0)} />
            </div>
            <div>
              调试2
              <InputNumber step={0.01} value={debugNum2} onChange={(e) => setDebugNum2(e ?? 0)} />
            </div>
            <div>
              调试3
              <InputNumber step={0.01} value={debugNum3} onChange={(e) => setDebugNum3(e ?? 0)} />
            </div>
            <div>
              调试4
              <InputNumber step={0.01} value={debugNum4} onChange={(e) => setDebugNum4(e ?? 0)} />
            </div>
            <div>
              调试5
              <InputNumber step={0.01} value={debugNum5} onChange={(e) => setDebugNum5(e ?? 0)} />
            </div>
            <div>
              <Button
                size="large"
                onClick={() => {
                  gameData.moves.testSetStage("getNewDice");
                }}
              >
                test
              </Button>
            </div>
          </div>
        </div>
      )}

      <SP_GameContext.Provider
        value={{
          gameData,
          clientPlayerID,
          clientPlayerInfo,
          nowPlayingPlayerID,
          nowPlayingPlayerInfo,
          allItemPosition,
        }}
      >
        <div ref={konvaRef} className={styles["konva"]}>
          <Stage
            ref={stageRef}
            x={stagePosition.x}
            y={stagePosition.y}
            width={stageSize.width}
            height={stageSize.height}
            onContextMenu={(e) => e.evt.preventDefault()}
            scale={{ x: stageScale, y: stageScale }}
            onWheel={handleStageWheel}
            draggable
            onDragEnd={handleStageDragEnd}
          >
            <Layer listening={false}>
              <Rect
                x={-stageSize.width * 2}
                y={-stageSize.height * 2}
                width={stageSize.width * 10} // 注意这里用缩放后的尺寸
                height={stageSize.height * 10}
                fillPatternImage={backMainImage}
                fillPatternRepeat="repeat" // 平铺
              />
            </Layer>
            <Layer>
              {shapes.map((shape) => {
                if (shape.id === "MainBoard") {
                  return (
                    <MainBoard
                      key={shape.id}
                      draggable
                      x={shape.x}
                      y={shape.y}
                      onDragEnd={(e) => handleShapesDragEnd(e, shape.id)}
                    />
                  );
                }
              })}

              {gameData.matchData?.map((item) => {
                const playerInfo = gameData.G.playersInfo[item.id];
                const key = "UserBoard" + item.id;
                return (
                  <UserBoard
                    key={key}
                    x={shapes.find((item) => item.id === key)?.x || 0}
                    y={shapes.find((item) => item.id === key)?.y || 0}
                    draggable
                    boardPlayerInfo={playerInfo}
                    matchData={gameData.matchData?.[item.id] || { id: 0 }}
                    onDragEnd={(e) => handleShapesDragEnd(e, key)}
                  />
                );
              })}
            </Layer>
            <Layer>
              {[
                ...gameData.G.boardInfo.card.level_1_pile,
                ...gameData.G.boardInfo.card.level_2_pile,
                ...gameData.G.boardInfo.card.level_3_pile,
                ...gameData.G.boardInfo.card.level_4_pile,
                ...gameData.G.boardInfo.card.level_5_pile,
                ...gameData.G.boardInfo.card.level_1_show,
                ...gameData.G.boardInfo.card.level_2_show,
                ...gameData.G.boardInfo.card.level_3_show,
                ...gameData.G.boardInfo.card.level_4_show,
                ...gameData.G.boardInfo.card.level_5_show,
                ...(gameData.G.playersInfo[0].cards || []),
                ...(gameData.G.playersInfo[1]?.cards || []),
                ...(gameData.G.playersInfo[2]?.cards || []),
                ...(gameData.G.playersInfo[3]?.cards || []),
                ...(gameData.G.playersInfo[0].lockedCards || []),
                ...(gameData.G.playersInfo[1]?.lockedCards || []),
                ...(gameData.G.playersInfo[2]?.lockedCards || []),
                ...(gameData.G.playersInfo[3]?.lockedCards || []),
              ].map((cardId) => {
                if (!cardId) {
                  return null;
                }
                const cardPosInfo = allItemPosition.cards[cardId];

                if (!cardPosInfo?.isShow) {
                  return null;
                }
                return (
                  <PokemonCard
                    key={cardId}
                    x={cardPosInfo.x}
                    y={cardPosInfo.y}
                    id={cardId}
                    isFaceUp={cardPosInfo.isFaceUp}
                    isHorizontal={cardPosInfo.isHorizontal}
                    onClick={() => {
                      if (clientPlayerID !== nowPlayingPlayerID) {
                        message.error("当前不是你的回合，不可操作");
                        return;
                      }
                      if (!(cardPosInfo.pos === "main" || cardPosInfo.pos === clientPlayerID)) {
                        message.error("不可选择其他玩家的精灵球");
                        return;
                      }
                      if (cardPosInfo.isProvisional) {
                        gameData.moves.cleanProvisionalMove(cardId);
                      } else {
                        gameData.moves.provisionalGetCardMove(cardId);
                      }
                    }}
                  />
                );
              })}
            </Layer>
            <Layer>
              {[
                ...gameData.G.boardInfo.token.black,
                ...gameData.G.boardInfo.token.blue,
                ...gameData.G.boardInfo.token.pink,
                ...gameData.G.boardInfo.token.purple,
                ...gameData.G.boardInfo.token.red,
                ...gameData.G.boardInfo.token.yellow,
                ...(gameData.G.playersInfo[0]?.tokens || []),
                ...(gameData.G.playersInfo[1]?.tokens || []),
                ...(gameData.G.playersInfo[2]?.tokens || []),
                ...(gameData.G.playersInfo[3]?.tokens || []),
              ].map((tokenId) => {
                const tokenPosInfo = allItemPosition.tokens[tokenId];
                const tokenInfo = SP_TokenObj[tokenId];
                if (!tokenPosInfo?.isShow) {
                  return null;
                }
                return (
                  <PokemonBall
                    key={tokenId}
                    x={tokenPosInfo.x}
                    y={tokenPosInfo.y}
                    id={tokenId}
                    onClick={() => {
                      if (clientPlayerID !== nowPlayingPlayerID) {
                        message.error("当前不是你的回合，不可操作");
                        return;
                      }
                      if (!(tokenPosInfo.pos === "main" || tokenPosInfo.pos === clientPlayerID)) {
                        message.error("不可选择其他玩家的精灵球");
                        return;
                      }

                      if (stagesType === "discard") {
                        if (tokenPosInfo.pos === clientPlayerID) {
                          gameData.moves.removeTokensMove([tokenId]);
                        } else {
                          message.error("不可选择其他玩家的精灵球");
                          return;
                        }
                      }

                      if (tokenPosInfo.pos === "main") {
                        if (tokenInfo.color === SP_ColorEnum.Purple) {
                          message.error("大师球不可直接选择");
                          return;
                        }

                        const nowSelectColor: Record<SP_ColorEnum, number> = {
                          [SP_ColorEnum.Red]: 0,
                          [SP_ColorEnum.Blue]: 0,
                          [SP_ColorEnum.Black]: 0,
                          [SP_ColorEnum.Pink]: 0,
                          [SP_ColorEnum.Purple]: 0,
                          [SP_ColorEnum.Yellow]: 0,
                        };
                        nowPlayingPlayerInfo.provisionalTokens.forEach((token) => {
                          nowSelectColor[SP_TokenObj[token].color]++;
                        });
                        const boardColor: Record<SP_ColorEnum, number> = {
                          [SP_ColorEnum.Red]: gameData.G.boardInfo.token.red.length,
                          [SP_ColorEnum.Blue]: gameData.G.boardInfo.token.blue.length,
                          [SP_ColorEnum.Black]: gameData.G.boardInfo.token.black.length,
                          [SP_ColorEnum.Pink]: gameData.G.boardInfo.token.pink.length,
                          [SP_ColorEnum.Purple]: gameData.G.boardInfo.token.purple.length,
                          [SP_ColorEnum.Yellow]: gameData.G.boardInfo.token.yellow.length,
                        };
                        if (nowSelectColor[tokenInfo.color] === 1 && boardColor[tokenInfo.color] < 4) {
                          message.warning("当前宝石小于4个，不可同时选择2个");
                          return;
                        }
                        if (Object.values(nowSelectColor).some((v) => v >= 2)) {
                          message.warning("已有宝石同时选择2个");
                          return;
                        }
                        if (Object.values(nowSelectColor).filter((v) => v === 1).length >= 3) {
                          message.warning("已有3个宝石同时选择1个");
                          return;
                        }
                        if (
                          nowSelectColor[tokenInfo.color] === 1 &&
                          nowPlayingPlayerInfo.provisionalTokens.length >= 2
                        ) {
                          message.warning("当前已选择了异色精灵球，不可再选择同色精灵球");
                          return;
                        }
                        gameData.moves.provisionalGetTokenMove(tokenId);
                      }

                      if (tokenPosInfo.isProvisional) {
                        gameData.moves.provisionalRemoveTokenMove(tokenId);
                      }
                    }}
                  />
                );
              })}
            </Layer>
            <Layer>
              {[
                gameData.G.boardInfo.card.level_3_pile.length,
                gameData.G.boardInfo.card.level_2_pile.length,
                gameData.G.boardInfo.card.level_1_pile.length,
              ].map((v, i) => {
                const shape = shapes.find((s) => s.id === `MainBoard`)!;
                return (
                  <TextBox
                    key={i}
                    x={shape.x + 20}
                    y={shape.y + 16 + i * 112}
                    width={30}
                    height={30}
                    text={v.toString()}
                  />
                );
              })}
              {[
                gameData.G.boardInfo.card.level_4_pile.length + 1,
                gameData.G.boardInfo.card.level_5_pile.length + 1,
              ].map((v, i) => {
                const shape = shapes.find((s) => s.id === `MainBoard`)!;
                return (
                  <TextBox
                    key={i}
                    x={shape.x + 577}
                    y={shape.y + 33 + i * 130}
                    width={30}
                    height={30}
                    text={v.toString()}
                  />
                );
              })}
              {[
                gameData.G.boardInfo.token.red.length,
                gameData.G.boardInfo.token.blue.length,
                gameData.G.boardInfo.token.black.length,
                gameData.G.boardInfo.token.pink.length,
                gameData.G.boardInfo.token.yellow.length,
                gameData.G.boardInfo.token.purple.length,
              ].map((v, i) => {
                const shape = shapes.find((s) => s.id === `MainBoard`)!;
                let x = shape.x + 16 + i * 88;
                if (i === 5) {
                  x += 30;
                }
                const y = shape.y + 340;
                return <TextBox key={i} x={x} y={y} width={30} height={30} text={v.toString()} />;
              })}
            </Layer>
          </Stage>
          <Tooltip />
        </div>
      </SP_GameContext.Provider>
    </div>
  );
}
