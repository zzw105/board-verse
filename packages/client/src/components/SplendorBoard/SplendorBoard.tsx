import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SplendorGameType } from "@game/shared";
import { eventBus, type Events } from "../../utils/eventBus";
import { MenuItemKeyEnum } from "../../enum/game";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { Button } from "antd";
import { generateCardJSX } from "../../utils";

export function SplendorBoard(data: BoardProps<SplendorGameType>) {
  console.log(111111111, data);

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
  // 原始舞台设计尺寸
  const originalStageSize = { width: 1920, height: 861 };
  // 缩放比例
  const scale = Math.min(stageSize.width / originalStageSize.width, stageSize.height / originalStageSize.height);

  const cardPositionX: Record<number, number> = {
    1: 30,
    2: 300,
    3: 430,
    4: 560,
    5: 690,
  };
  const cardPositionY: Record<number, number> = {
    0: 30,
    1: 210,
    2: 390,
  };

  // 右键事件
  const { nowGroupName } = useContextMenuStore();
  const handler = useCallback(
    (e: Events["menuItemOnClick"]) => {
      const { type } = e;
      switch (type) {
        case MenuItemKeyEnum.BUY:
          data.moves.buyCard(nowGroupName);
          break;
        case MenuItemKeyEnum.LOCKING:
          console.log(222);
          break;
      }
    },
    [data.moves, nowGroupName]
  );

  // 绑定事件
  useEffect(() => {
    eventBus.on("menuItemOnClick", handler);
    return () => eventBus.off("menuItemOnClick", handler);
  }, [handler]);

  // 处理显示卡片的信息
  const level1Card = data.G.cards.filter((item) => item.level === 1);
  const level2Card = data.G.cards.filter((item) => item.level === 2);
  const level3Card = data.G.cards.filter((item) => item.level === 3);
  const level1CardJSX = generateCardJSX(level1Card, cardPositionX, cardPositionY, 1, 2);
  const level2CardJSX = generateCardJSX(level2Card, cardPositionX, cardPositionY, 1, 1);
  const level3CardJSX = generateCardJSX(level3Card, cardPositionX, cardPositionY, 1, 0);

  return (
    <div className={styles["splendor-board"]}>
      <div className={styles.title}>
        <Button
          size="large"
          onClick={() => {
            data.moves.gameReset();
          }}
        >
          重置
        </Button>
      </div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage width={stageSize.width} height={stageSize.height} scaleX={scale} scaleY={scale}>
          <Layer>
            {level3CardJSX}
            {level2CardJSX}
            {level1CardJSX}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
