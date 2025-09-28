import { useEffect, useRef } from "react";

import { DicePointsEnum, StateEnum } from "@game/shared";
import Konva from "konva";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/dice.png";
import { ShadowBlurEnum } from "../../../enum/game";

interface Props {
  x: number;
  y: number;
  point: DicePointsEnum | StateEnum.EMPTY;
  type: number;
  canOperation: boolean;
  center?: boolean;
}

export const Dice = ({ x, y, point, type, canOperation, center }: Props) => {
  const imageWidth = 420 / 6;
  const imageHeight = 350 / 5;
  const imageScale = 0.5;

  const cropFrame = {
    x: point === StateEnum.EMPTY ? 0 : point - 1,
    y: type,
  };

  const [image] = useImage(img);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (g && image) {
      g.cache();
    }
  }, [image]);

  if (point === StateEnum.EMPTY) {
    return null;
  }

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      offsetX={center ? (imageWidth / 2) * imageScale : 0}
      offsetY={center ? (imageHeight / 2) * imageScale : 0}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
      onMouseOver={() => {
        if (canOperation) {
          document.body.style.cursor = "pointer";
        }
      }}
      onMouseOut={() => {
        if (canOperation) {
          document.body.style.cursor = "default";
        }
      }}
    >
      <Image
        image={image}
        shadowBlur={ShadowBlurEnum.TOKEN}
        width={imageWidth}
        height={imageHeight}
        scale={{ x: imageScale, y: imageScale }}
        crop={{
          x: cropFrame.x * imageWidth,
          y: cropFrame.y * imageHeight,
          width: imageWidth,
          height: imageHeight,
        }}
      />
    </Group>
  );
};
