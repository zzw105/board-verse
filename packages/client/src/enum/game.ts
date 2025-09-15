import type { MenuProps } from "antd";
import type { ItemType } from "antd/es/menu/interface";
import { eventBus } from "../utils/eventBus";
import { useContextMenuStore } from "../store/useContextMenuStore";

export type GameTypeKeyType = keyof typeof GameTypeEnum;

export enum GameTypeEnum {
  splendorMonorepo = "璀璨宝石",
  splendorMonorepoTest = "璀璨宝石测试",
}
export enum MenuItemKeyEnum {
  BUY = "buy",
  LOCKING = "locking",
}
export type MenuItemInfoType = {
  key: MenuItemKeyEnum;
  label: string;
};
export const AllMenuItemInfoList: Record<MenuItemKeyEnum, ItemType> = {
  [MenuItemKeyEnum.BUY]: {
    key: MenuItemKeyEnum.BUY,
    label: "购买",
    onClick: () => {
      const name = useContextMenuStore.getState().nowGroupName;
      if (name) {
        eventBus.emit("menuItemOnClick", { type: MenuItemKeyEnum.BUY, name });
      } else {
        console.error("nowGroupName is null");
      }
    },
  },
  [MenuItemKeyEnum.LOCKING]: {
    key: MenuItemKeyEnum.LOCKING,
    label: "锁定",
    onClick: () => {
      const name = useContextMenuStore.getState().nowGroupName;
      if (name) {
        eventBus.emit("menuItemOnClick", { type: MenuItemKeyEnum.LOCKING, name });
      } else {
        console.error("nowGroupName is null");
      }
    },
  },
};

export type MenuType = "card";
export const cardMenuItemList: MenuProps["items"] = [
  AllMenuItemInfoList[MenuItemKeyEnum.BUY],
  AllMenuItemInfoList[MenuItemKeyEnum.LOCKING],
];
