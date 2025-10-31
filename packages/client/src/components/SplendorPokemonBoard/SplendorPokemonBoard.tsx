import { useEffect, useRef, useState } from "react";

import {
  SP_CardIdList,
  type SP_CardIdType,
  SP_CardObj,
  SP_ColorEnum,
  type SP_GameType,
  SP_TokenIdList,
  type SP_TokenIdType,
  SP_TokenObj,
} from "@game/shared";
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
import { Tooltip } from "./components/Tooltip";
import { UserBoard } from "./components/UserBoard";

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

  // console.log({ gameData });
  /* hook */
  const navigate = useNavigate();
  const { name } = useUserStore();
  // useGameLogs(gameData.G.logs);

  const { stagesType, setStagesType } = use_SP_Store();

  const nowStagesType = (gameData.playerID !== null && gameData.ctx.activePlayers?.[gameData.playerID]) || undefined;
  useEffect(() => {
    if (stagesType !== nowStagesType) {
      setStagesType(nowStagesType);
      if (nowStagesType === "choiceCargos") {
        message.warning("当前阶段为货物选择阶段，不能进行其他操作");
      } else if (nowStagesType === "removeCargos") {
        message.warning("当前阶段为货物移除阶段，不能进行其他操作");
      } else if (nowStagesType === "getNewDice") {
        message.warning("当前阶段为自选骰子阶段，不能进行其他操作");
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
    { id: "MainBoard", x: 590, y: 10 },
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

  type cardsItemPositionType = {
    x: number;
    y: number;
    isShow: boolean;
    isFaceUp: boolean;
    isHorizontal: boolean;
  };

  type AllItemPositionType = {
    cards: Record<SP_CardIdType, cardsItemPositionType>;
    tokens: Record<SP_TokenIdType, { x: number; y: number; isShow: boolean }>;
  };
  const initialTokensPosition: AllItemPositionType = {
    cards: SP_CardIdList.reduce(
      (acc, key) => {
        acc[key] = { x: 0, y: 0, isFaceUp: true, isHorizontal: false, isShow: false };
        return acc;
      },
      {} as AllItemPositionType["cards"],
    ),
    tokens: SP_TokenIdList.reduce(
      (acc, key) => {
        acc[key] = { x: 0, y: 0, isShow: false };
        return acc;
      },
      {} as AllItemPositionType["tokens"],
    ),
  };
  const [allItemPosition, setAllItemPosition] = useState<AllItemPositionType>(initialTokensPosition);
  useEffect(() => {
    const mainBoard = shapes.find((shape) => shape.id === `MainBoard`)!;
    [
      gameData.G.boardInfo.card.level_1_pile,
      gameData.G.boardInfo.card.level_2_pile,
      gameData.G.boardInfo.card.level_3_pile,
    ].forEach((pile, level) => {
      pile.forEach((card) => {
        if (card) {
          const cardPosInfo = allItemPosition.cards[card];
          cardPosInfo.x = mainBoard.x + 20;
          cardPosInfo.y = mainBoard.y + 16 + (2 - level) * 112;
          cardPosInfo.isShow = true;
          cardPosInfo.isFaceUp = false;
        }
      });
    });
    [
      gameData.G.boardInfo.card.level_1_show,
      gameData.G.boardInfo.card.level_2_show,
      gameData.G.boardInfo.card.level_3_show,
    ].forEach((pile, level) => {
      pile.forEach((card, num) => {
        if (card) {
          const cardPosInfo = allItemPosition.cards[card];
          cardPosInfo.x = mainBoard.x + 20 + 113 + num * 88;
          cardPosInfo.y = mainBoard.y + 16 + (2 - level) * 112;
          cardPosInfo.isShow = true;
          cardPosInfo.isFaceUp = true;
        }
      });
    });
    [gameData.G.boardInfo.card.level_4_pile, gameData.G.boardInfo.card.level_5_pile].forEach((pile, level) => {
      pile.forEach((card) => {
        if (card) {
          const cardPosInfo = allItemPosition.cards[card];
          cardPosInfo.x = mainBoard.x + 507;
          cardPosInfo.y = mainBoard.y + 63 + level * 130;
          cardPosInfo.isShow = true;
          cardPosInfo.isFaceUp = false;
        }
      });
    });
    [gameData.G.boardInfo.card.level_4_show, gameData.G.boardInfo.card.level_5_show].forEach((pile, level) => {
      pile.forEach((card) => {
        if (card) {
          const cardPosInfo = allItemPosition.cards[card];
          cardPosInfo.x = mainBoard.x + 507;
          cardPosInfo.y = mainBoard.y + 63 + level * 130;
          cardPosInfo.isShow = true;
          cardPosInfo.isFaceUp = true;
        }
      });
    });
    const colorList: Record<SP_ColorEnum, number> = {
      [SP_ColorEnum.Red]: 1,
      [SP_ColorEnum.Blue]: 2,
      [SP_ColorEnum.Black]: 3,
      [SP_ColorEnum.Pink]: 4,
      [SP_ColorEnum.Yellow]: 5,
      [SP_ColorEnum.Purple]: 6,
    };
    gameData.G.playersInfo.forEach((player, playId) => {
      const playerBoard = shapes.find((shape) => shape.id === `UserBoard${playId}`);
      if (!playerBoard) {
        console.error(`UserBoard${playId} not found`);
        return;
      }
      const pos: Record<SP_ColorEnum, number> = {
        [SP_ColorEnum.Red]: 0,
        [SP_ColorEnum.Blue]: 0,
        [SP_ColorEnum.Purple]: 0,
        [SP_ColorEnum.Black]: 0,
        [SP_ColorEnum.Pink]: 0,
        [SP_ColorEnum.Yellow]: 0,
      };

      player.cards.forEach((card) => {
        const cardInfo = SP_CardObj[card];
        const cardPosInfo = allItemPosition.cards[card];
        cardPosInfo.x = playerBoard.x + 72 + colorList[cardInfo.color] * 80;
        pos[cardInfo.color]++;
        cardPosInfo.y = playerBoard.y + 45 + (pos[cardInfo.color] - 1) * 23.2;
        cardPosInfo.isShow = true;
        cardPosInfo.isFaceUp = true;
      });
      player.tokens.forEach((token, index) => {
        const tokenPosInfo = allItemPosition.tokens[token];
        tokenPosInfo.x = playerBoard.x + 9 + (index % 2) * 62;
        tokenPosInfo.y = playerBoard.y + 40 + Math.floor(index / 2) * 59;
        tokenPosInfo.isShow = true;
      });
    });

    //
    for (const key in gameData.G.boardInfo.token) {
      const tokenColor = key as SP_ColorEnum;
      if (!Object.hasOwn(gameData.G.boardInfo.token, tokenColor)) continue;
      const tokenColorList = gameData.G.boardInfo.token[tokenColor];
      tokenColorList.forEach((token) => {
        const tokenPosInfo = allItemPosition.tokens[token];
        tokenPosInfo.x = mainBoard.x + 36 + (colorList[tokenColor] - 1) * 88;
        if (tokenColor === SP_ColorEnum.Purple) {
          tokenPosInfo.x += 30;
        }
        tokenPosInfo.y = mainBoard.y + 16 + 340;
        tokenPosInfo.isShow = true;
      });
    }
    setAllItemPosition({ ...allItemPosition });
  }, [gameData, shapes]);

  const [backMainImage] = useImage(backMainImg);

  return (
    <div className={styles.board}>
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
      <SP_GameContext.Provider
        value={{
          gameData,
          clientPlayerID: +(gameData.playerID ?? -1),
          clientPlayerInfo: gameData.G.playersInfo[+(gameData.playerID ?? -1)],
          nowPlayingPlayerID: +gameData.ctx.currentPlayer,
          nowPlayingPlayerInfo: gameData.G.playersInfo[+gameData.ctx.currentPlayer],
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
            {/* {[
              gameData.G.boardInfo.card.level_1_pile,
              gameData.G.boardInfo.card.level_2_pile,
              gameData.G.boardInfo.card.level_3_pile,
              gameData.G.boardInfo.card.level_4_pile,
              gameData.G.boardInfo.card.level_5_pile,
              gameData.G.boardInfo.card.level_1_show,
              gameData.G.boardInfo.card.level_2_show,
              gameData.G.boardInfo.card.level_3_show,
              gameData.G.boardInfo.card.level_4_show,
              gameData.G.boardInfo.card.level_5_show,
            ].map((pile) => {
              return (
                <Layer>
                  {pile.map((cardId) => {
                    const cardInfo = allItemPosition.cards[cardId];
                    // console.log(cardInfo);

                    if (!cardInfo.isShow) {
                      return null;
                    }
                    return (
                      <PokemonCard
                        key={cardId}
                        x={cardInfo.x}
                        y={cardInfo.y}
                        id={cardId}
                        isFaceUp={cardInfo.isFaceUp}
                        isHorizontal={cardInfo.isHorizontal}
                        onClick={() => {
                          allItemPosition.cards[cardId].isFaceUp = !allItemPosition.cards[cardId].isFaceUp;
                          // allItemPosition.cards[cardId].x = allItemPosition.cards[cardId].x + 100;
                          // allItemPosition.cards[cardId].y = allItemPosition.cards[cardId].y + 100;
                          setAllItemPosition({ ...allItemPosition });
                        }}
                      />
                    );
                  })}
                </Layer>
              );
            })} */}
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
                ...gameData.G.playersInfo[0].cards,
                ...gameData.G.playersInfo[1].cards,
                ...gameData.G.playersInfo[2].cards,
                ...gameData.G.playersInfo[3].cards,
              ].map((cardId) => {
                if (!cardId) {
                  return null;
                }
                const cardPosInfo = allItemPosition.cards[cardId];
                // console.log(cardInfo);

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
                      // allItemPosition.cards[cardId].isFaceUp = !allItemPosition.cards[cardId].isFaceUp;
                      // allItemPosition.cards[cardId].x = allItemPosition.cards[cardId].x + 100;
                      // allItemPosition.cards[cardId].y = allItemPosition.cards[cardId].y + 100;
                      // setAllItemPosition({ ...allItemPosition });
                      gameData.moves.getCardMove(cardId);
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
                ...gameData.G.playersInfo[0].tokens,
                ...gameData.G.playersInfo[1].tokens,
                ...gameData.G.playersInfo[2].tokens,
                ...gameData.G.playersInfo[3].tokens,
              ].map((tokenId) => {
                const tokenPosInfo = allItemPosition.tokens[tokenId];
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
                      gameData.moves.getTokenMove(tokenId);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
          <Tooltip />
        </div>
      </SP_GameContext.Provider>
    </div>
  );
}
