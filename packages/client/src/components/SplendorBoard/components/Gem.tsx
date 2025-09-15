import { Image as KonvaImage, Group } from "react-konva";
import { splendorGameGemList, type SplendorGameGemNameType } from "@game/shared";
import { gemsImage } from "../../../utils/loadAllImg";

interface SpriteImageProps {
  x: number;
  y: number;
  scale?: number;
  offsetCenter?: boolean;
  type: SplendorGameGemNameType;
}

export function Gem({ x, y, offsetCenter, scale = 0.35, type }: SpriteImageProps) {
  // const [image, setImage] = useState<HTMLImageElement | null>(null);
  const gemInfo = splendorGameGemList[type];
  const width = 950 / 5;
  const height = 168;

  // useEffect(() => {
  //   getGemsImage().then((img) => setImage(img));
  // }, []);

  return (
    <Group
      x={x}
      y={y}
      scaleX={scale}
      scaleY={scale}
      offsetX={offsetCenter ? width / 2 : 0}
      offsetY={offsetCenter ? height / 2 : 0}
    >
      <KonvaImage
        shadowBlur={18}
        image={gemsImage!}
        width={width}
        height={height}
        crop={{
          x: gemInfo.frameX * width,
          y: gemInfo.frameY * width,
          width: width,
          height: height,
        }}
      />
    </Group>
  );
}
