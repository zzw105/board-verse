import { Range, Range1ToN } from "../utils";
import { spiritIslandMapImg } from "./img";

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

/** 地图区域信息T */
export type RegionT = {
  /** 区域key */
  key: `map_${Range1ToN<1>}_${"a"}_${Range<8>}`;
  /** 区域编号 */
  regionNumber: number;
  /** 区域网络url地址 */
  url: string;
  /** 区域在地图中的位置，用于画布定位 */
  pos: PointT;
  /** 探索者数量 */
  explorerCount: number;
  /** 村庄数量 */
  villageCount: number;
  /** 城镇数量 */
  townCount: number;
  /** 达昂人数量 */
  daangCount: number;
  /** 污染物数量 */
  polluteCount: number;
  /** 灵迹数量 */
  spiritCount: Record<string, number>;
  /** 区域类型 */
  regionType: RegionItemTypeE;
  /** 相连区域Key列表 */
  adjacentRegionKeys: RegionT["key"][];
};

/** 定位信息T */
export type PointT = {
  /** 定位点x坐标 */
  x: number;
  /** 定位点y坐标 */
  y: number;
};

/** 地图区域初始状态T */
export type RegionItemConfigInitialStateT = {
  /** 探索者数量 */
  explorerCount: number;
  /** 村庄数量 */
  villageCount: number;
  /** 城镇数量 */
  townCount: number;
  /** 达昂人数量 */
  daangCount: number;
  /** 污染物数量 */
  polluteCount: number;
  /** 相连区域Key列表 */
  adjacentRegionKeys: RegionT["key"][];
};

/* 地图 */
/** 地图默认T */
export type MapItemBaseT = {
  /** 地图key */
  key: `map_${Range1ToN<1>}_${"a"}`;
};
/** 地图配制信息T */
export type MapItemConfigT = MapItemBaseT & {
  /** 地图网络url地址 */
  url: string;
  /** 地图区域信息 */
  regions: Record<RegionItemBaseT["key"], RegionItemConfigT>;
};
/** 地图状态信息T */
export type MapItemStateT = MapItemBaseT & {
  /** 地图区域信息 */
  regions: Record<RegionItemBaseT["key"], RegionItemStateT>;
  /** 地图的拥有者 */
  owner: string;
};

/* 地图区域 */
/** 地图区域默认T */
export type RegionItemBaseT = {
  /** 区域key */
  key: `map_${Range1ToN<1>}_${"a"}_${Range<8>}`;
  /** 区域编号 */
  regionNumber: number;
  /** 区域类型 */
  regionType: RegionItemTypeE;
};
/** 地图区域默认T */
export type RegionItemConfigT = RegionItemBaseT & {
  /** 区域网络url地址 */
  url: string;
  /** 区域在地图中的位置，用于画布定位 */
  pos: PointT;
  /** 初始状态 */
  initialState: RegionItemConfigInitialStateT;
};
/** 地图区域状态信息T */
export type RegionItemStateT = RegionItemBaseT &
  RegionItemConfigInitialStateT & {
    /** 灵迹数量 */
    spiritCount: Record<string, number>;
  };

// 所有地图统一管理
export const mapsAllConfig: MapItemConfigT[] = [
  {
    key: "map_1_a",
    url: spiritIslandMapImg.map_1_a,
    regions: {
      map_1_a_0: {
        key: "map_1_a_0",
        url: spiritIslandMapImg.map_1_a_0,
        pos: {
          x: 64.38,
          y: 139,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 0,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_1", "map_1_a_2", "map_1_a_3"],
        },
        regionNumber: 0,
        regionType: RegionItemTypeE.ocean,
      },
      map_1_a_1: {
        key: "map_1_a_1",
        url: spiritIslandMapImg.map_1_a_1,
        pos: {
          x: 462,
          y: 102.9,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 0,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_0", "map_1_a_2", "map_1_a_4", "map_1_a_5", "map_1_a_6"],
        },
        regionNumber: 1,
        regionType: RegionItemTypeE.mountain,
      },
      map_1_a_2: {
        key: "map_1_a_2",
        url: spiritIslandMapImg.map_1_a_2,
        pos: {
          x: 224,
          y: 258.52,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 1,
          daangCount: 1,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_0", "map_1_a_1", "map_1_a_3", "map_1_a_4"],
        },
        regionNumber: 2,
        regionType: RegionItemTypeE.wetland,
      },
      map_1_a_3: {
        key: "map_1_a_3",
        url: spiritIslandMapImg.map_1_a_3,
        pos: {
          x: 60,
          y: 732.5,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 2,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_0", "map_1_a_2", "map_1_a_4"],
        },
        regionNumber: 3,
        regionType: RegionItemTypeE.forest,
      },
      map_1_a_4: {
        key: "map_1_a_4",
        url: spiritIslandMapImg.map_1_a_4,
        pos: {
          x: 432.5,
          y: 519.5,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 0,
          polluteCount: 1,
          adjacentRegionKeys: ["map_1_a_1", "map_1_a_2", "map_1_a_3", "map_1_a_5"],
        },
        regionNumber: 4,
        regionType: RegionItemTypeE.sand,
      },
      map_1_a_5: {
        key: "map_1_a_5",
        url: spiritIslandMapImg.map_1_a_5,
        pos: {
          x: 651.5,
          y: 334.97,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 0,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_1", "map_1_a_4", "map_1_a_6", "map_1_a_7", "map_1_a_8"],
        },
        regionNumber: 5,
        regionType: RegionItemTypeE.wetland,
      },
      map_1_a_6: {
        key: "map_1_a_6",
        url: spiritIslandMapImg.map_1_a_6,
        pos: {
          x: 713.26,
          y: 122.43,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 1,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_1", "map_1_a_5", "map_1_a_8"],
        },
        regionNumber: 6,
        regionType: RegionItemTypeE.mountain,
      },
      map_1_a_7: {
        key: "map_1_a_7",
        url: spiritIslandMapImg.map_1_a_7,
        pos: {
          x: 858.73,
          y: 394,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 0,
          townCount: 0,
          daangCount: 2,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_5", "map_1_a_8"],
        },
        regionNumber: 7,
        regionType: RegionItemTypeE.sand,
      },
      map_1_a_8: {
        key: "map_1_a_8",
        url: spiritIslandMapImg.map_1_a_8,
        pos: {
          x: 973.5,
          y: 58,
        },
        initialState: {
          explorerCount: 0,
          villageCount: 1,
          townCount: 0,
          daangCount: 0,
          polluteCount: 0,
          adjacentRegionKeys: ["map_1_a_5", "map_1_a_6", "map_1_a_7"],
        },
        regionNumber: 8,
        regionType: RegionItemTypeE.forest,
      },
    },
  },
];
