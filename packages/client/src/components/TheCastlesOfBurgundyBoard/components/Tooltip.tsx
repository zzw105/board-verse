import { Tag, Label } from "react-konva";
import { useTooltipStore } from "../../../store/useTooltipStore";

export const Tooltip = () => {
  const { visible, position, content } = useTooltipStore();

  return (
    visible && (
      <Label x={position.x} y={position.y} listening={false}>
        <Tag
          fill="black"
          pointerDirection="down"
          pointerWidth={10}
          pointerHeight={10}
          lineJoin="round"
          cornerRadius={5}
        />
        {content}
      </Label>
    )
  );
};
