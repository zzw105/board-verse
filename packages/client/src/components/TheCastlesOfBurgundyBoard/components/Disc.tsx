import { useEffect, useRef } from "react";

import Konva from "konva";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/discs.png";
import { ShadowBlurEnum } from "../../../enum/game";

interface Props {
  x: number;
  y: number;
  type: number;
  center?: boolean;
}

export const Disc = ({ x, y, type, center }: Props) => {
  const imageWidth = 200 / 4;
  const imageHeight = 50;
  const imageScale = 0.5;

  const cropFrame = {
    x: type,
    y: 0,
  };

  const [image] = useImage(img);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (g && image) {
      g.cache();
    }
  }, [image, type]);

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      offsetX={center ? (imageWidth / 2) * imageScale : 0}
      offsetY={center ? (imageHeight / 2) * imageScale : 0}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      <Image
        image={image}
        shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
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
