import type { MenuProps } from "antd";
import type Konva from "konva";
import { create } from "zustand";
import { cardMenuItemList, type MenuType } from "../enum/game";
import type { SplendorGameCardName } from "@game/shared";

export type UseContextMenuStoreType = {
  menuPos: { x: number; y: number } | null;
  nowGroupName: SplendorGameCardName | null;
  menuItemList: MenuProps["items"];
  setMenuPos: (pos: { x: number; y: number }) => void;
  setMenuItemList: (itemList: MenuProps["items"]) => void;
  setNowGroupName: (name: SplendorGameCardName) => void;
  handleContextMenu: (e: Konva.KonvaEventObject<PointerEvent>, type: MenuType, name: SplendorGameCardName) => void;
  closeMenu: () => void;
};

export const useContextMenuStore = create<UseContextMenuStoreType>((set, get) => ({
  menuPos: null,
  nowGroupName: null,
  menuItemList: [],
  setMenuPos: (pos) => set({ menuPos: pos }),
  setMenuItemList: (itemList) => set({ menuItemList: itemList }),
  setNowGroupName: (name) => set({ nowGroupName: name }),
  closeMenu: () => set({ menuPos: null }),
  handleContextMenu: (e, type, name) => {
    e.evt.preventDefault();
    get().setNowGroupName(name);
    switch (type) {
      case "card":
        get().setMenuItemList(cardMenuItemList);
        break;
      default:
        break;
    }
    get().setMenuPos({ x: e.evt.clientX, y: e.evt.clientY });
  },
}));
