import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

/** 地图key枚举 */
export const MapKeyE = {
  map_1_a: "map_1_a",
} as const;
/** 地图key类型 */
export type MapKeyT = (typeof MapKeyE)[keyof typeof MapKeyE];

/** 区域key枚举 */
export const RegionKeyE = {
  map_1_a_0: "map_1_a_0",
  map_1_a_1: "map_1_a_1",
  map_1_a_2: "map_1_a_2",
  map_1_a_3: "map_1_a_3",
  map_1_a_4: "map_1_a_4",
  map_1_a_5: "map_1_a_5",
  map_1_a_6: "map_1_a_6",
  map_1_a_7: "map_1_a_7",
  map_1_a_8: "map_1_a_8",
} as const;
/** 区域key类型 */
export type RegionKeyT = (typeof RegionKeyE)[keyof typeof RegionKeyE];

/** 区域类型枚举 */
export const RegionTypeE = {
  /** 海洋 */
  ocean: "ocean",
  /** 林地 */
  forest: "forest",
  /** 沙地 */
  sand: "sand",
  /** 山地 */
  mountain: "mountain",
  /** 湿地 */
  wetland: "wetland",
} as const;
/** 区域类型类型 */
export type RegionTypeT = (typeof RegionTypeE)[keyof typeof RegionTypeE];
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

export class PointS extends Schema {
  /** 定位点x坐标 */
  @type("number") x = 0;
  /** 定位点y坐标 */
  @type("number") y = 0;
}

export class RegionS extends Schema {
  /** 区域key */
  @type("string") key!: RegionKeyT;
  /** 区域编号 */
  @type("number") regionNumber = 0;
  /** 区域类型 */
  @type("string") regionType!: RegionTypeT;
  /** 探索者数量 */
  @type("number") explorerCount = 0;
  /** 村庄数量 */
  @type("number") villageCount = 0;
  /** 城镇数量 */
  @type("number") townCount = 0;
  /** 达昂人数量 */
  @type("number") daangCount = 0;
  /** 污染物数量 */
  @type("number") polluteCount = 0;
  /** 相连区域Key列表 */
  @type(["string"]) adjacentRegionKeys = new ArraySchema<RegionKeyT>();
  /** 灵迹数量 */
  // spiritCount: Record<string, number>;
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

export class SpiritIslandRoomS extends Schema {
  @type({ map: PlayerSchema }) players = new MapSchema<PlayerSchema>();
  @type({ map: MapS }) map = new MapSchema<MapS, MapKeyT>();
}
