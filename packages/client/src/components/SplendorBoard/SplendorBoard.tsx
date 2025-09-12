import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Stage, Layer } from "react-konva";
import styles from "./SplendorBoard.module.less";
import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";

export function SplendorBoard(data: BoardProps) {
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

  const contentSize = { width: 1920 / 1.5, height: 811 / 1.5 }; // 原始舞台设计尺寸
  const scale = Math.min(stageSize.width / contentSize.width, stageSize.height / contentSize.height);

  return (
    <div className={styles["splendor-board"]}>
      <div className={styles.title}>{JSON.stringify(data)}</div>
      <div ref={konvaRef} className={styles["konva"]}>
        <Stage width={stageSize.width} height={stageSize.height} scaleX={scale} scaleY={scale}>
          <Layer>
            <Card x={0} y={0} cardName="black1" />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
