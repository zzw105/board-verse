import { Image as KonvaImage, Group } from "react-konva";
import { splendorGameTokenList, type SplendorGameTokenNameType, type SplendorGameTokenType } from "@game/shared";
import { tokensImage } from "../../../utils/loadAllImg";
import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { useContextMenuStore } from "../../../store/useContextMenuStore";
import { Tween } from "konva/lib/Tween";

interface SpriteImageProps {
  x: number;
  y: number;
  canOperations?: boolean;
  scale?: number;
  offsetCenter?: boolean;
  type: SplendorGameTokenNameType;
}

export const Token = React.memo(({ x, y, offsetCenter, scale = 0.35, type, canOperations }: SpriteImageProps) => {
  // 宝石筹码信息
  const tokenInfo = splendorGameTokenList[type] as SplendorGameTokenType;
  const width = 1218 / 6;
  const height = 182;

  // 右键菜单Store
  const { handleContextMenu } = useContextMenuStore();

  // 卡片移动动画
  const tweenRef = useRef<Tween | null>(null);
  // 平滑移动动画
  useEffect(() => {
    if (!groupRef.current) return;
    if (tweenRef.current) tweenRef.current.finish();
    tweenRef.current = new Tween({
      node: groupRef.current,
      duration: 0.4,
      x: x,
      y: y,
      easing: Konva.Easings.EaseInOut,
      onFinish: () => {
        tweenRef.current = null;
      },
    });
    tweenRef.current.play();
  }, [x, y]);

  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.cache();
  }, []);

  return (
    <Group
      ref={groupRef}
      scaleX={scale}
      scaleY={scale}
      offsetX={offsetCenter ? width / 2 : 0}
      offsetY={offsetCenter ? height / 2 : 0}
      onContextMenu={(e) => canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      <KonvaImage
        shadowBlur={18}
        image={tokensImage!}
        width={width}
        height={height}
        crop={{
          x: tokenInfo.frameX * width,
          y: tokenInfo.frameY * width,
          width: width,
          height: height,
        }}
      />
    </Group>
  );
});
