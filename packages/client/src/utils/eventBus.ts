import mitt from "mitt";
import { MenuItemKeyEnum } from "../enum/game";
import type { SplendorGameCardName, SplendorGameTokenNameType } from "@game/shared";

export type Events = {
  // [K in MenuItemKeyEnum]: void;
  menuItemOnClick: { type: MenuItemKeyEnum; name: SplendorGameCardName | SplendorGameTokenNameType };
};
export const eventBus = mitt<Events>();
