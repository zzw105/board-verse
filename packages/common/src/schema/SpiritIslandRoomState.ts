import { Range, Range1ToN } from "@board-verse/common";
import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

// export class Inventory extends Schema {
//   @type("string") name = "";
//   @type("number") quantity = 0;
// }

export class PlayerSchema extends Schema {
  @type("string") name = "";
  @type("number") x = 0;
  @type("number") y = 0;

  // @type([Inventory]) inventory = new ArraySchema<Inventory>();
}
export type RegionKeyT = `map_${Range1ToN<1>}_${"a"}_${Range<8>}`;
/** 区域类型枚举 */
export enum RegionItemTypeE {
  /** 海洋 */
  ocean = "ocean",
  /** 林地 */
  forest = "forest",
  /** 沙地 */
  sand = "sand",
  /** 山地 */
  mountain = "mountain",
  /** 湿地 */
  wetland = "wetland",
}
export class RegionS extends Schema {
  /** 区域key */
  @type("string") key!: RegionKeyT;
  /** 区域编号 */
  @type("number") regionNumber = 0;
  /** 区域类型 */
  @type(RegionItemTypeE) regionType!: RegionItemTypeE;
}

/** 地图S */
export class MapS extends Schema {
  /** 地图key */
  @type("string") key!: MapKeyT;
  /** 地图网络url地址 */
  @type("string") url = "";
  /** 地图的拥有者 */
  @type("string") owner = "";
  /** 地图区域信息 */
  @type({ map: RegionS }) regions = new MapSchema<RegionS, RegionKeyT>();
}

export type MapKeyT = `map_${Range1ToN<1>}_${"a"}`;

export class SpiritIslandRoomS extends Schema {
  @type({ map: PlayerSchema }) players = new MapSchema<PlayerSchema>();
  @type({ map: MapS }) map = new MapSchema<MapS, MapKeyT>();
}
