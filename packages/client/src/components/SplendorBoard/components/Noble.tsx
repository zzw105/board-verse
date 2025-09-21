import { useEffect, useRef, type JSX } from "react";
import { Rect, Image as KonvaImage, Group, Text } from "react-konva";
import Konva from "konva";
import { splendorGameNobleObj, type SplendorGameNobleNameType, type SplendorGameNobleType } from "@game/shared";
import React from "react";
import { noblesImage } from "../../../utils/loadAllImg";
import { Tween } from "konva/lib/Tween";
import { NoblePoint } from "./NoblePoint";

interface NobleProps {
  x: number;
  y: number;
  nobleName: SplendorGameNobleNameType;
}

const scale = 1.15;
const width = 1000 / 5;
const height = 400 / 2;

export const Noble = React.memo(({ x, y, nobleName }: NobleProps) => {
  // 当前的贵族信息
  const nobleInfo = splendorGameNobleObj[nobleName] as SplendorGameNobleType;

  // 卡片组
  const groupRef = useRef<Konva.Group>(null);
  // 卡片移动动画
  const tweenRef = useRef<Tween | null>(null);

  // 平滑移动动画
  useEffect(() => {
    if (!groupRef.current) return;
    if (tweenRef.current) tweenRef.current.finish();
    const g = groupRef.current;
    tweenRef.current = new Tween({
      node: groupRef.current,
      duration: 0.4,
      x: x + (width * scale) / 2,
      y: y + (height * scale) / 2,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        tweenRef.current = null;
        // g.cache();
      },
    });
    g.clearCache();
    tweenRef.current.play();
  }, [x, y]);

  // 卡片花费点
  const noblePointJsxList: JSX.Element[] = [];
  (["black", "red", "green", "blue", "white"] as const).forEach((gem) => {
    const element = nobleInfo.cost[gem];
    if (element > 0) {
      const index = noblePointJsxList.length;
      noblePointJsxList.push(
        <NoblePoint key={nobleInfo.name + "frontPoint" + gem} x={10} y={155 - index * 45} point={element} type={gem} />
      );
    }
  });

  return (
    <Group ref={groupRef} offsetX={width / 2} offsetY={height / 2} scaleX={scale} scaleY={scale}>
      <Rect width={width} height={height} fill="#fff" shadowBlur={8} cornerRadius={8} />

      {/* 正面 */}
      {noblesImage && (
        <>
          <KonvaImage
            key={nobleInfo.name + "front"}
            image={noblesImage}
            width={width}
            height={height}
            crop={{ x: nobleInfo.frameX * width, y: nobleInfo.frameY * height, width, height }}
            cornerRadius={8}
          />
          <Rect x={0} y={0} width={50} height={height} fill="white" opacity={0.6} cornerRadius={[8, 0, 0, 8]} />
          {/* <Gem key={cardInfo.name + "frontGem"} x={width - 45} y={85 / 2} offsetCenter type={cardInfo.color} /> */}
          {nobleInfo.point > 0 && (
            <Text
              key={nobleInfo.name + "frontText"}
              text={nobleInfo.point.toString()}
              fontSize={50}
              fill="white"
              fontFamily="Arial"
              fontStyle="bold italic"
              stroke="#000"
              strokeWidth={2}
              align="center"
              verticalAlign="middle"
              x={8}
              y={80 / 2}
              offsetY={65 / 2}
              skewX={-0.2}
            />
          )}
          {noblePointJsxList}
        </>
      )}
    </Group>
  );
});
