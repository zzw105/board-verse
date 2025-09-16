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
  const originalStageSize = { width: 1920, height: 811 };
  // 缩放比例
  const scale = Math.min(stageSize.width / originalStageSize.width, stageSize.height / originalStageSize.height);

  const positionX: Record<number, number> = {
    1: 50,
    2: 400,
    3: 600,
    4: 800,
    5: 1000,
  };
  const positionY: Record<number, number> = {
    0: 50,
    1: 350,
    2: 650,
  };

  // const testCardList: JSX.Element[] = [];
  // const list: SplendorGameCardName[] = [
  //   "white1",
  //   "white2",
  //   "white3",
  //   "white4",
  //   "white5",
  //   "white6",
  //   "white7",
  //   "white8",
  //   "white9",
  //   "white10",
  //   "white11",
  //   "white12",
  //   "white13",
  //   "white14",
  //   "white15",
  //   "white16",
  //   "white17",
  //   "white18",
  // ];
  // let y = 50;
  // let x = 50;
  // list.forEach((item) => {
  //   testCardList.push(<Card key={item} x={x} y={y} cardName={item} isFaceUp={isFaceUp} />);
  //   if (x > 1500) {
  //     x = 50;
  //     y += 300;
  //   } else {
  //     x += 200;
  //   }
  // });
  const nowGroupName = useContextMenuStore((state) => state.nowGroupName);
  const nowGroupNameRef = useRef(nowGroupName);
  useEffect(() => {
    nowGroupNameRef.current = nowGroupName;
  }, [nowGroupName]);

  const handler = useCallback(
    (e: Events["menuItemOnClick"]) => {
      const { type } = e;
      switch (type) {
        case MenuItemKeyEnum.BUY:
          data.moves.buyCard(nowGroupNameRef.current);
          break;
        case MenuItemKeyEnum.LOCKING:
          console.log(222);
          break;
      }
    },
    [data.moves]
  );

  useEffect(() => {
    eventBus.on("menuItemOnClick", handler);
    return () => eventBus.off("menuItemOnClick", handler);
  }, [handler]);

  const level1Card = data.G.cards.filter((item) => item.level === 1);
  const level2Card = data.G.cards.filter((item) => item.level === 2);
  const level3Card = data.G.cards.filter((item) => item.level === 3);
  const level1CardJSX = generateCardJSX(level1Card, positionX, positionY, 1, 0);
  const level2CardJSX = generateCardJSX(level2Card, positionX, positionY, 1, 1);
  const level3CardJSX = generateCardJSX(level3Card, positionX, positionY, 1, 2);

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
            {level1CardJSX}
            {level2CardJSX}
            {level3CardJSX}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
