import type Konva from "konva";
import _ from "lodash";
import type { JSX } from "react";
import React from "react";
import { create } from "zustand";

export type TooltipStoreType = {
  visible: boolean;
  position: { x: number; y: number };
  content: JSX.Element;
  timer: NodeJS.Timeout | null;
  setVisible: (visible: boolean) => void;
  setPosition: (pos: { x: number; y: number }) => void;
  setContent: (content: JSX.Element) => void;
  setTimer: (timer: NodeJS.Timeout | null) => void;
  targetEnter: (e: Konva.KonvaEventObject<MouseEvent>, content: JSX.Element) => void;
  targetMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  targetLeave: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

export const useTooltipStore = create<TooltipStoreType>((set, get) => {
  const throttledMove = _.throttle((pos: { x: number; y: number }) => {
    set({ position: pos });
  }, 50); // 每 50ms 最多触发一次

  return {
    visible: false,
    position: { x: 0, y: 0 },
    content: React.createElement(React.Fragment),
    timer: null,
    setVisible: (visible: boolean) => set({ visible }),
    setPosition: (position) => set({ position }),
    setContent: (content: JSX.Element) => set({ content }),
    setTimer: (timer: NodeJS.Timeout | null) => set({ timer }),
    targetEnter: (e, content) => {
      const item = setTimeout(() => {
        const stage = e.target.getStage();
        if (stage) {
          const pos = stage.getPointerPosition();
          if (pos) {
            get().setPosition({ x: pos.x - stage.attrs.x, y: pos.y - stage.attrs.y });
            get().setVisible(true);
            get().setContent(content);
          }
        }
      }, 500);
      get().setTimer(item);
    },
    targetMove: (e) => {
      if (!get().visible) return;
      const stage = e.target.getStage();
      if (stage) {
        const pos = stage.getPointerPosition();
        if (pos) {
          throttledMove({ x: pos.x - stage.attrs.x, y: pos.y - stage.attrs.y });
        }
      }
    },
    targetLeave: () => {
      const timer = get().timer;
      if (timer) clearTimeout(timer);
      get().setTimer(null);
      get().setVisible(false);
    },
  };
});
