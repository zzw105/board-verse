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
  SELECT_TOKEN = "selectToken",
  CANCEL_TOKEN = "cancelToken",
  CONFIRM_TOKEN = "confirmToken",
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
  [MenuItemKeyEnum.SELECT_TOKEN]: {
    key: MenuItemKeyEnum.SELECT_TOKEN,
    label: "选择此宝石",
    onClick: () => {
      const name = useContextMenuStore.getState().nowSelectTokenName;
      if (name) {
        eventBus.emit("menuItemOnClick", { type: MenuItemKeyEnum.SELECT_TOKEN, name });
      } else {
        console.error("nowSelectTokenName is null");
      }
    },
  },
  [MenuItemKeyEnum.CANCEL_TOKEN]: {
    key: MenuItemKeyEnum.CANCEL_TOKEN,
    label: "取消选择此宝石",
    onClick: () => {
      const name = useContextMenuStore.getState().nowSelectTokenName;
      if (name) {
        eventBus.emit("menuItemOnClick", { type: MenuItemKeyEnum.CANCEL_TOKEN, name });
      } else {
        console.error("nowSelectTokenName is null");
      }
    },
  },
  [MenuItemKeyEnum.CONFIRM_TOKEN]: {
    key: MenuItemKeyEnum.CONFIRM_TOKEN,
    label: "宝石选择完毕",
    onClick: () => {
      const name = useContextMenuStore.getState().nowSelectTokenName;
      if (name) {
        eventBus.emit("menuItemOnClick", { type: MenuItemKeyEnum.CONFIRM_TOKEN, name });
      } else {
        console.error("nowSelectTokenName is null");
      }
    },
  },
};

export const cardMenuItemList: MenuProps["items"] = [
  AllMenuItemInfoList[MenuItemKeyEnum.BUY],
  AllMenuItemInfoList[MenuItemKeyEnum.LOCKING],
];
export const cardBuyMenuItemList: MenuProps["items"] = [AllMenuItemInfoList[MenuItemKeyEnum.BUY]];
export const cardLockMenuItemList: MenuProps["items"] = [AllMenuItemInfoList[MenuItemKeyEnum.LOCKING]];
export const tokenMenuItemList: MenuProps["items"] = [
  AllMenuItemInfoList[MenuItemKeyEnum.SELECT_TOKEN],
  AllMenuItemInfoList[MenuItemKeyEnum.CANCEL_TOKEN],
  AllMenuItemInfoList[MenuItemKeyEnum.CONFIRM_TOKEN],
];

export enum OperationKeyEnum {
  RETURN_TOKEN,
}
