import { Image, Group } from "react-konva";
import { useEffect, useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import spaceMbBgImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/goods2019.jpg";
import { ShadowBlurEnum } from "../../../enum/game";
import { DicePointsEnum, type CargoType } from "@game/shared";

interface Props {
  x: number;
  y: number;
  cargoInfo: CargoType;
  center?: boolean;
}

export const Cargo = ({ x, y, cargoInfo, center }: Props) => {
  const { point, isBack } = cargoInfo;
  const imageWidth = 560 / 7;
  const imageHeight = 80;
  const imageScale = 0.62;

  const cropFrame = {
    x: 0,
    y: 0,
  };
  if (isBack) {
    cropFrame.x = 6;
    cropFrame.y = 0;
  } else {
    switch (point) {
      case DicePointsEnum.ONE:
        cropFrame.x = 0;
        cropFrame.y = 0;
        break;
      case DicePointsEnum.TWO:
        cropFrame.x = 1;
        cropFrame.y = 0;
        break;
      case DicePointsEnum.THREE:
        cropFrame.x = 2;
        cropFrame.y = 0;
        break;
      case DicePointsEnum.FOUR:
        cropFrame.x = 3;
        cropFrame.y = 0;
        break;
      case DicePointsEnum.FIVE:
        cropFrame.x = 4;
        cropFrame.y = 0;
        break;
      case DicePointsEnum.SIX:
        cropFrame.x = 5;
        cropFrame.y = 0;
        break;
      default:
        break;
    }
  }

  const [spaceMbBgImage] = useImage(spaceMbBgImg);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (g && spaceMbBgImage) {
      g.cache();
    }
  }, [spaceMbBgImage]);

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
        image={spaceMbBgImage}
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
