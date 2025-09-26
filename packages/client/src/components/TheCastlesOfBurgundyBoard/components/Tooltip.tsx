import React from "react";
import { useTooltipStore } from "../../../store/useTooltipStore";

export const Tooltip: React.FC = () => {
  const { visible, position, content } = useTooltipStore();

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x + 10,
        top: position.y + 10,
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: 4,
        fontSize: 16,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {content}
    </div>
  );
};
