import { Image, Group } from "react-konva";
import { useEffect, useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import spaceMbBgImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/space_mb_bg.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { BuildingsColorEnum } from "@game/shared";

interface SpriteImageProps {
  x: number;
  y: number;
  type: BuildingsColorEnum;
  center?: boolean;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export const BuildingBackground = ({ x, type, y, center, onDragEnd }: SpriteImageProps) => {
  const imageWidth = 800 / 8;
  const imageHeight = 112;
  const imageScale = 0.53;

  const cropFrame = {
    x: 0,
    y: 0,
  };

  switch (type) {
    case BuildingsColorEnum.BROWN:
      cropFrame.x = 0;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.YELLOW:
      cropFrame.x = 1;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.DARK_GREEN:
      cropFrame.x = 2;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.GREY:
      cropFrame.x = 3;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.BLUE:
      cropFrame.x = 4;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.GREEN:
      cropFrame.x = 5;
      cropFrame.y = 0;
      break;
    case BuildingsColorEnum.BLACK:
      cropFrame.x = 6;
      cropFrame.y = 0;
      break;

    default:
      break;
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
      onDragEnd={onDragEnd}
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
