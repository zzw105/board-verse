import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import type { SplendorGameCardName } from "@game/shared";
import { eventBus, type Events } from "../../utils/eventBus";
import { MenuItemKeyEnum } from "../../enum/game";

export function SplendorBoard(data: BoardProps) {
  console.log(111111111, data);

  const konvaRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });

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

  const contentSize = { width: 1920, height: 811 }; // 原始舞台设计尺寸
  const scale = Math.min(stageSize.width / contentSize.width, stageSize.height / contentSize.height);

  // const position = {
  //   "1-1": {
  //     x: 50,
  //     y: 50,
  //   },
  //   "1-2": {
  //     x: 250,
  //     y: 50,
  //   },
  //   "1-3": {
  //     x: 450,
  //     y: 50,
  //   },
  //   "1-4": {
  //     x: 650,
  //     y: 50,
  //   },
  //   "1-5": {
  //     x: 850,
  //     y: 50,
  //   },
  // };

  const testCardList: JSX.Element[] = [];
  const list: SplendorGameCardName[] = [
    "white1",
    "white2",
    "white3",
    "white4",
    "white5",
    "white6",
    "white7",
    "white8",
    "white9",
    "white10",
    "white11",
    "white12",
    "white13",
    "white14",
    "white15",
    "white16",
    "white17",
    "white18",
  ];
  let y = 50;
  let x = 50;
  const [isFaceUp, setIsFaceUp] = useState(false);
  list.forEach((item) => {
    testCardList.push(<Card key={item} x={x} y={y} cardName={item} isFaceUp={isFaceUp} />);
    if (x > 1500) {
      x = 50;
      y += 300;
    } else {
      x += 200;
    }
  });
  const handler = (e: Events["menuItemOnClick"]) => {
    const { type } = e;
    switch (type) {
      case MenuItemKeyEnum.BUY:
        setIsFaceUp((prev) => !prev);
        break;
      case MenuItemKeyEnum.LOCKING:
        // setIsFaceUp(false);
        break;
    }
  };

  useEffect(() => {
    eventBus.on("menuItemOnClick", handler);
    return () => eventBus.off("menuItemOnClick", handler);
  }, []);
  return (
    <div className={styles["splendor-board"]}>
      <div className={styles.title}></div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage width={stageSize.width} height={stageSize.height} scaleX={scale} scaleY={scale} draggable={true}>
          <Layer>
            {/* <Card x={position["1-1"].x} y={position["1-1"].y} cardName="black1" />
            <Card x={position["1-2"].x} y={position["1-2"].y} cardName="black15" />
            <Card x={position["1-3"].x} y={position["1-3"].y} cardName="black16" />
            <Card x={position["1-4"].x} y={position["1-4"].y} cardName="black11" />
            <Card x={position["1-5"].x} y={position["1-5"].y} cardName="black8" /> */}
            {testCardList}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
