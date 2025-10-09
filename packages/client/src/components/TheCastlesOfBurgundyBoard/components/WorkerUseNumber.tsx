import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";

import countersImg from "../../../assets/theCastlesOfBurgundyMonorepo/imgs/counters.png";
import { ShadowBlurEnum } from "../../../enum/game";

interface Props {
  x: number;
  y: number;
  center?: boolean;
  scale?: number;
  number: number;
}

export const WorkerUseNumber = ({ x, y, scale = 1, number }: Props) => {
  const [countersImage] = useImage(countersImg);
  const countersImageWidth = 336 / 6; // 从文件中获取写死
  const countersImageHeight = 92; // 从文件中获取写死
  const countersImageScale = 0.4;
  const countersWidth = 50;
  const countersHeight = 40;

  return (
    <Group
      x={x}
      y={y}
      scaleX={scale}
      scaleY={scale}
      width={countersWidth}
      height={countersHeight}
      offsetX={countersWidth / 2}
      offsetY={countersHeight / 2}
      // onContextMenu={(e) => isCurrent && canOperations && handleContextMenu({ e, type: "token", name: type })}
    >
      <Rect width={countersWidth} height={countersHeight} fill="white" />
      <Image
        image={countersImage}
        shadowBlur={ShadowBlurEnum.BACKGROUND_TOKEN}
        width={countersImageWidth}
        height={countersImageHeight}
        scale={{ x: countersImageScale, y: countersImageScale }}
        crop={{
          x: 0 * countersImageWidth,
          y: 0 * countersImageHeight,
          width: countersImageWidth,
          height: countersImageHeight,
        }}
      />
      <Text x={30} y={6} text={number.toString()} fontSize={30} fill="black" />
    </Group>
  );
};
