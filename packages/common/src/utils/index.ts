import { MapItemConfigT, MapItemStateT, RegionItemConfigT, RegionItemStateT } from "..";

export type Range<N extends number, Result extends number[] = []> = Result["length"] extends N
  ? Result[number] | N
  : Range<N, [...Result, Result["length"]]>;

// 生成 1~N
export type Range1ToN<N extends number> = Exclude<Range<N>, 0>;

// export const getRegionInfo = (regionKey: RegionT["key"]) => {
//   return Number(regionKey.split("_")[2]);
// };

export function createRegionState(config: RegionItemConfigT): RegionItemStateT {
  return {
    key: config.key,
    regionNumber: config.regionNumber,
    regionType: config.regionType,

    explorerCount: config.initialState.explorerCount,
    villageCount: config.initialState.villageCount,
    townCount: config.initialState.townCount,
    daangCount: config.initialState.daangCount,
    polluteCount: config.initialState.polluteCount,
    adjacentRegionKeys: [...config.initialState.adjacentRegionKeys],

    spiritCount: {},
  };
}

export function createMapState(mapConfig: MapItemConfigT): MapItemStateT {
  const regions = Object.fromEntries(
    Object.entries(mapConfig.regions).map(([key, cfg]) => [key, createRegionState(cfg)]),
  ) as MapItemStateT["regions"];

  return {
    key: mapConfig.key,
    owner: "",
    regions,
  };
}
