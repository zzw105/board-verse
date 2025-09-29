import { type DiceInfoType } from "@game/shared";
import type Konva from "konva";
import { Group, Image } from "react-konva";
import useImage from "use-image";

import img from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/dice.png";
import { ShadowBlurEnum, ShadowColorEnum } from "../../../enum/game";

interface Props {
  x: number;
  y: number;
  diceInfoType: DiceInfoType;
  type: number;
  center?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
}

export const Dice = ({ x, y, diceInfoType, type, center, selectable, selected, onSelect }: Props) => {
  const imageWidth = 420 / 6;
  const imageHeight = 350 / 5;
  const imageScale = 0.5;

  const cropFrame = {
    x: diceInfoType.point - 1,
    y: type,
  };

  const [image] = useImage(img);

  return (
    <Group
      x={x}
      y={y}
      offsetX={center ? (imageWidth / 2) * imageScale : 0}
      offsetY={center ? (imageHeight / 2) * imageScale : 0}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
      onMouseOver={() => {
        if (selectable) {
          document.body.style.cursor = "pointer";
        }
      }}
      onMouseOut={() => {
        if (selectable) {
          document.body.style.cursor = "default";
        }
      }}
      onClick={(e) => {
        if (selectable) {
          onSelect?.(e);
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
        shadowColor={
          selected ? ShadowColorEnum.SELECT : selectable ? ShadowColorEnum.CAN_OPERATE : ShadowColorEnum.DEFAULT
        }
        stroke={selected ? ShadowColorEnum.SELECT : selectable ? ShadowColorEnum.CAN_OPERATE : ""} // 描边颜色
        strokeWidth={4} // 描边宽度
      />
    </Group>
  );
};
