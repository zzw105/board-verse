import type { MenuProps } from "antd";
import type Konva from "konva";
import { create } from "zustand";
import { cardBuyMenuItemList, cardLockMenuItemList, cardMenuItemList, tokenMenuItemList } from "../enum/game";
import type { SplendorGameCardName, SplendorGameTokenNameType } from "@game/shared";

type HandleContextMenuArg =
  | { e: Konva.KonvaEventObject<PointerEvent>; type: "card" | "card-lock" | "card-buy"; name: SplendorGameCardName }
  | { e: Konva.KonvaEventObject<PointerEvent>; type: "token"; name: SplendorGameTokenNameType };

// 函数类型
export type HandleContextMenu = (arg: HandleContextMenuArg) => void;

export type UseContextMenuStoreType = {
  menuPos: { x: number; y: number } | null;
  nowGroupName: SplendorGameCardName | null;
  nowSelectTokenName: SplendorGameTokenNameType | null;
  menuItemList: MenuProps["items"];
  setMenuPos: (pos: { x: number; y: number }) => void;
  setMenuItemList: (itemList: MenuProps["items"]) => void;
  setNowGroupName: (name: SplendorGameCardName) => void;
  setNowSelectTokenName: (name: SplendorGameTokenNameType) => void;
  handleContextMenu: HandleContextMenu;
  closeMenu: () => void;
};

export const useContextMenuStore = create<UseContextMenuStoreType>((set, get) => ({
  menuPos: null,
  nowGroupName: null,
  nowSelectTokenName: null,
  menuItemList: [],
  setMenuPos: (pos) => set({ menuPos: pos }),
  setMenuItemList: (itemList) => set({ menuItemList: itemList }),
  setNowGroupName: (name) => set({ nowGroupName: name }),
  setNowSelectTokenName: (name) => set({ nowSelectTokenName: name }),
  closeMenu: () => set({ menuPos: null }),
  handleContextMenu: ({ e, type, name }) => {
    e.evt.preventDefault();
    switch (type) {
      case "card":
        get().setNowGroupName(name);
        get().setMenuItemList(cardMenuItemList);
        break;
      case "card-lock":
        get().setNowGroupName(name);
        get().setMenuItemList(cardLockMenuItemList);
        break;
      case "card-buy":
        get().setNowGroupName(name);
        get().setMenuItemList(cardBuyMenuItemList);
        break;
      case "token":
        get().setNowSelectTokenName(name);
        get().setMenuItemList(tokenMenuItemList);
        break;
      default:
        break;
    }
    get().setMenuPos({ x: e.evt.clientX, y: e.evt.clientY });
  },
}));
