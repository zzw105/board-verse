import { Group, Rect, Text } from "react-konva";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  fontSize?: number;
  draggable?: boolean;
}
export const TextBox = ({ x, y, width, height, text, fontSize = 16, draggable }: Props) => {
  return (
    <Group x={x} y={y} draggable={draggable}>
      <Rect
        width={width}
        height={height}
        fill="#00000059"
        cornerRadius={8}
        shadowColor="black"
        shadowBlur={4}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.3}
      />
      <Text
        text={text}
        fontSize={fontSize}
        fill="white"
        width={width}
        height={height}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};
