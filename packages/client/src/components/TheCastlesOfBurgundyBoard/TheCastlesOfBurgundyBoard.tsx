import type { TheCastlesOfBurgundyGameType } from "@game/shared";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import styles from "./TheCastlesOfBurgundyBoard.module.less";
import { useUserStore } from "../../store/useUserStore";
import { Button, InputNumber, Slider } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import type Konva from "konva";
import useImage from "use-image";
import backMainImg from "../../assets/theCastlesOfBurgundyMonorepo/imgs/back-main.jpg";
import { MainBoard } from "./components/MainBoard";
import { cloneDeep } from "lodash";
import { TheCastlesOfBurgundyGameContext } from "../../store/TheCastlesOfBurgundyGameContext";
import { Tooltip } from "./components/Tooltip";

export function TheCastlesOfBurgundyBoard(gameData: BoardProps<TheCastlesOfBurgundyGameType>) {
  console.log(123, gameData);
  /* hook */
  const navigate = useNavigate();
  const { name } = useUserStore();

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
    const scaleBy = 1.03;
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
    console.log(222);

    const { x, y } = e.target.position();
    setStagePositionLocal({ x, y });
  };
  /* 可拖动图形组件 */
  const initShapes = [{ id: "MainBoard", x: 10, y: 10 }];
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
      </div>
      <TheCastlesOfBurgundyGameContext.Provider value={gameData}>
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
            </Layer>
            <Layer>
              <Tooltip />
            </Layer>
          </Stage>
        </div>
      </TheCastlesOfBurgundyGameContext.Provider>
    </div>
  );
}
