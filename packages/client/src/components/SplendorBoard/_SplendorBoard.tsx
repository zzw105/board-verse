import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import type { SplendorGameType } from "@game/shared";
import { eventBus, type Events } from "../../utils/eventBus";
import { MenuItemKeyEnum } from "../../enum/game";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { Button } from "antd";

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
  // const [isFaceUp, setIsFaceUp] = useState(false);
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

  const handler = (e: Events["menuItemOnClick"]) => {
    const { type } = e;
    switch (type) {
      case MenuItemKeyEnum.BUY:
        data.moves.buyCard(nowGroupNameRef.current);
        break;
      case MenuItemKeyEnum.LOCKING:
        // setIsFaceUp(false);
        break;
    }
  };

  // const

  useEffect(() => {
    eventBus.on("menuItemOnClick", handler);
    return () => eventBus.off("menuItemOnClick", handler);
  }, []);
  const [xx, setXx] = useState(1);
  const [isFaceUp, setIsFaceUp] = useState(false);
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
        <Button
          size="large"
          onClick={() => {
            setXx((x) => x + 1);
            setIsFaceUp((f) => !f);
          }}
        >
          ++
        </Button>
      </div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage width={stageSize.width} height={stageSize.height} scaleX={scale} scaleY={scale}>
          <Layer>
            <Card key={"black1"} x={positionX[xx]} y={positionY[0]} cardName={"black1"} isFaceUp={isFaceUp} />
            {/* {data.G.cards.level3Card.map((item, index) => (
              <Card
                key={item.name}
                x={positionX[1] + index * 2}
                y={positionY[0]}
                cardName={item.name}
                isFaceUp={true}
              />
            ))}
            {data.G.cards.level2Card.map((item, index) => (
              <Card
                key={item.name}
                x={positionX[1] + index * 2}
                y={positionY[1]}
                cardName={item.name}
                isFaceUp={true}
              />
            ))}
            {data.G.cards.level1Card.map((item, index) => (
              <Card
                key={item.name}
                x={positionX[1] + index * 2}
                y={positionY[2]}
                cardName={item.name}
                isFaceUp={true}
              />
            ))}
            {data.G.cards.showLevel3Card.map((item, index) => (
              <Card key={item.name} x={positionX[2 + index]} y={positionY[0]} cardName={item.name} isFaceUp={false} />
            ))}
            {data.G.cards.showLevel2Card.map((item, index) => (
              <Card key={item.name} x={positionX[2 + index]} y={positionY[1]} cardName={item.name} isFaceUp={false} />
            ))}
            {data.G.cards.showLevel1Card.map((item, index) => (
              <Card key={item.name} x={positionX[2 + index]} y={positionY[2]} cardName={item.name} isFaceUp={false} />
            ))} */}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
