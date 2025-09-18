import mitt from "mitt";
import { MenuItemKeyEnum, OperationKeyEnum } from "../enum/game";
import type { SplendorGameCardName, SplendorGameTokenNameType } from "@game/shared";

export type Events = {
  // [K in MenuItemKeyEnum]: void;
  menuItemOnClick: { type: MenuItemKeyEnum; name: SplendorGameCardName | SplendorGameTokenNameType };
  operationOnClick: { type: OperationKeyEnum; name: string };
};
export const eventBus = mitt<Events>();
