import { Image, Group } from "react-konva";
import { useEffect, useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import spaceDieBgImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/space_die_bg.png";
import spaceBgImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/space_background.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { BuildingsColorEnum, DicePointsEnum } from "@game/shared";

interface Props {
  x: number;
  y: number;
  type: BuildingsColorEnum;
  center?: boolean;
  point: DicePointsEnum;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const PointBuildingBackground = ({ x, type, y, point, center, onDragEnd }: Props) => {
  const spaceBgImageWidth = 606 / 6;
  const spaceBgImageHeight = 115;
  const spaceBgImageScale = 0.53;

  const spaceDieBgImageWidth = 252 / 6;
  const spaceDieBgImageHeight = 42;
  const spaceDieBgImageScale = 0.53;

  const spaceBgCropFrame = {
    x: 0,
    y: 0,
  };
  switch (type) {
    case BuildingsColorEnum.BROWN:
      spaceBgCropFrame.x = 0;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.YELLOW:
      spaceBgCropFrame.x = 1;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.DARK_GREEN:
      spaceBgCropFrame.x = 2;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.GREY:
      spaceBgCropFrame.x = 3;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.BLUE:
      spaceBgCropFrame.x = 4;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.GREEN:
      spaceBgCropFrame.x = 5;
      spaceBgCropFrame.y = 0;
      break;
    case BuildingsColorEnum.BLACK:
      spaceBgCropFrame.x = 6;
      spaceBgCropFrame.y = 0;
      break;

    default:
      break;
  }

  const spaceDieBgCropFrame = {
    x: 0,
    y: 0,
  };
  switch (point) {
    case DicePointsEnum.ONE:
      spaceDieBgCropFrame.x = 0;
      spaceDieBgCropFrame.y = 0;
      break;
    case DicePointsEnum.TWO:
      spaceDieBgCropFrame.x = 1;
      spaceDieBgCropFrame.y = 0;
      break;
    case DicePointsEnum.THREE:
      spaceDieBgCropFrame.x = 2;
      spaceDieBgCropFrame.y = 0;
      break;
    case DicePointsEnum.FOUR:
      spaceDieBgCropFrame.x = 3;
      spaceDieBgCropFrame.y = 0;
      break;
    case DicePointsEnum.FIVE:
      spaceDieBgCropFrame.x = 4;
      spaceDieBgCropFrame.y = 0;
      break;
    case DicePointsEnum.SIX:
      spaceDieBgCropFrame.x = 5;
      spaceBgCropFrame.y = 0;
      break;
    default:
      break;
  }

  const [spaceDieBgImage] = useImage(spaceDieBgImg);
  const [spaceBgImage] = useImage(spaceBgImg);
  // 锁定
  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    const g = groupRef.current;
    if (g && spaceDieBgImage && spaceBgImage) {
      g.cache();
    }
  }, [spaceDieBgImage, spaceBgImage]);

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      offsetX={center ? (spaceBgImageWidth / 2) * spaceBgImageScale : 0}
      offsetY={center ? (spaceBgImageHeight / 2) * spaceBgImageScale : 0}
      onDragEnd={onDragEnd}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      <Image
        image={spaceBgImage}
        shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
        width={spaceBgImageWidth}
        height={spaceBgImageHeight}
        scale={{ x: spaceBgImageScale, y: spaceBgImageScale }}
        crop={{
          x: spaceBgCropFrame.x * spaceBgImageWidth,
          y: spaceBgCropFrame.y * spaceBgImageHeight,
          width: spaceBgImageWidth,
          height: spaceBgImageHeight,
        }}
      />
      <Image
        image={spaceDieBgImage}
        x={(spaceBgImageWidth * spaceBgImageScale) / 2}
        y={(spaceBgImageHeight * spaceBgImageScale) / 2}
        shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
        width={spaceDieBgImageWidth}
        height={spaceDieBgImageHeight}
        scale={{ x: spaceDieBgImageScale, y: spaceDieBgImageScale }}
        offsetX={spaceDieBgImageWidth / 2}
        offsetY={spaceDieBgImageHeight / 2}
        crop={{
          x: spaceDieBgCropFrame.x * spaceDieBgImageWidth,
          y: spaceDieBgCropFrame.y * spaceDieBgImageHeight,
          width: spaceDieBgImageWidth,
          height: spaceDieBgImageHeight,
        }}
      />
    </Group>
  );
};
