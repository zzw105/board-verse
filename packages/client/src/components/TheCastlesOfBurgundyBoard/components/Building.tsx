import { Image, Group, Text } from "react-konva";
import { useEffect, useRef } from "react";
import Konva from "konva";
import useImage from "use-image";
import spaceMbBgImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/tiles2019.png";
import { ShadowBlurEnum } from "../../../enum/game";
import { BuildingsBrownTypeEnum, BuildingsColorEnum, BuildingsGreenTypeEnum, type BuildingsType } from "@game/shared";
import { useTooltipStore } from "../../../store/useTooltipStore";

interface Props {
  x: number;
  y: number;
  buildingInfo: BuildingsType;
  center?: boolean;
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
}
export const Building = ({ x, buildingInfo, y, center, onDragEnd }: Props) => {
  const imageWidth = 800 / 8;
  const imageHeight = 1120 / 10;
  const imageScale = 0.53;

  const cropFrame = {
    x: 0,
    y: 0,
  };

  switch (buildingInfo.color) {
    case BuildingsColorEnum.BROWN:
      switch (buildingInfo.brownType) {
        case BuildingsBrownTypeEnum.MARKET:
          cropFrame.x = 3;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.CARPENTER:
          cropFrame.x = 1;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.CHURCH:
          cropFrame.x = 2;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.WAREHOUSE:
          cropFrame.x = 0;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.DORMITORY:
          cropFrame.x = 4;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.BANK:
          cropFrame.x = 5;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.TOWN_HALL:
          cropFrame.x = 6;
          cropFrame.y = 0;
          break;
        case BuildingsBrownTypeEnum.LOOKOUT:
          cropFrame.x = 7;
          cropFrame.y = 0;
          break;
      }
      break;
    case BuildingsColorEnum.YELLOW:
      switch (buildingInfo.yellowType) {
        case 1:
          cropFrame.x = 0;
          cropFrame.y = 2;
          break;
        case 2:
          cropFrame.x = 1;
          cropFrame.y = 2;
          break;
        case 3:
          cropFrame.x = 2;
          cropFrame.y = 2;
          break;
        case 4:
          cropFrame.x = 3;
          cropFrame.y = 2;
          break;
        case 5:
          cropFrame.x = 4;
          cropFrame.y = 2;
          break;
        case 6:
          cropFrame.x = 5;
          cropFrame.y = 2;
          break;
        case 7:
          cropFrame.x = 6;
          cropFrame.y = 2;
          break;
        case 8:
          cropFrame.x = 7;
          cropFrame.y = 2;
          break;
        case 9:
          cropFrame.x = 0;
          cropFrame.y = 3;
          break;
        case 10:
          cropFrame.x = 1;
          cropFrame.y = 3;
          break;
        case 11:
          cropFrame.x = 2;
          cropFrame.y = 3;
          break;
        case 12:
          cropFrame.x = 3;
          cropFrame.y = 3;
          break;
        case 13:
          cropFrame.x = 4;
          cropFrame.y = 3;
          break;
        case 14:
          cropFrame.x = 5;
          cropFrame.y = 3;
          break;
        case 15:
          cropFrame.x = 6;
          cropFrame.y = 3;
          break;
        case 16:
          cropFrame.x = 7;
          cropFrame.y = 3;
          break;
        case 17:
          cropFrame.x = 0;
          cropFrame.y = 4;
          break;
        case 18:
          cropFrame.x = 1;
          cropFrame.y = 4;
          break;
        case 19:
          cropFrame.x = 2;
          cropFrame.y = 4;
          break;
        case 20:
          cropFrame.x = 3;
          cropFrame.y = 4;
          break;
        case 21:
          cropFrame.x = 4;
          cropFrame.y = 4;
          break;
        case 22:
          cropFrame.x = 5;
          cropFrame.y = 4;
          break;
        case 23:
          cropFrame.x = 6;
          cropFrame.y = 4;
          break;
        case 24:
          cropFrame.x = 7;
          cropFrame.y = 4;
          break;
        case 25:
          cropFrame.x = 0;
          cropFrame.y = 5;
          break;
        case 26:
          cropFrame.x = 1;
          cropFrame.y = 5;
          break;
      }
      break;
    case BuildingsColorEnum.DARK_GREEN:
      cropFrame.x = 2;
      cropFrame.y = 5;
      break;
    case BuildingsColorEnum.GREY:
      cropFrame.x = 4;
      cropFrame.y = 5;
      break;
    case BuildingsColorEnum.BLUE:
      cropFrame.x = 6;
      cropFrame.y = 5;
      break;
    case BuildingsColorEnum.GREEN:
      switch (buildingInfo.greenType) {
        case BuildingsGreenTypeEnum.GOAT:
          switch (buildingInfo.number) {
            case 2:
              cropFrame.x = 0;
              cropFrame.y = 6;
              break;
            case 3:
              cropFrame.x = 1;
              cropFrame.y = 6;
              break;
            case 4:
              cropFrame.x = 2;
              cropFrame.y = 6;
              break;
          }
          break;
        case BuildingsGreenTypeEnum.COWS:
          switch (buildingInfo.number) {
            case 2:
              cropFrame.x = 5;
              cropFrame.y = 6;
              break;
            case 3:
              cropFrame.x = 6;
              cropFrame.y = 6;
              break;
            case 4:
              cropFrame.x = 7;
              cropFrame.y = 6;
              break;
          }
          break;
        case BuildingsGreenTypeEnum.PIG:
          switch (buildingInfo.number) {
            case 2:
              cropFrame.x = 2;
              cropFrame.y = 7;
              break;
            case 3:
              cropFrame.x = 3;
              cropFrame.y = 7;
              break;
            case 4:
              cropFrame.x = 4;
              cropFrame.y = 7;
              break;
          }
          break;
        case BuildingsGreenTypeEnum.SHEEP:
          switch (buildingInfo.number) {
            case 2:
              cropFrame.x = 7;
              cropFrame.y = 7;
              break;
            case 3:
              cropFrame.x = 0;
              cropFrame.y = 8;
              break;
            case 4:
              cropFrame.x = 1;
              cropFrame.y = 8;
              break;
          }
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

  const { targetEnter, targetLeave, targetMove } = useTooltipStore();

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      offsetX={center ? (imageWidth / 2) * imageScale : 0}
      offsetY={center ? (imageHeight / 2) * imageScale : 0}
      onDragEnd={onDragEnd}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
      onMouseEnter={(e) =>
        targetEnter(e, <Text text={`建筑: ${buildingInfo.color}`} fontSize={14} padding={5} fill="white" />)
      }
      onMouseLeave={targetLeave}
      onMouseMove={targetMove}
    >
      <Image
        image={spaceMbBgImage}
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
