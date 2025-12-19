import { Range, Range1ToN } from "../utils";
import { spiritIslandMapImg } from "./img";

/** 区域类型枚举 */
export enum RegionTypeE {
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
  regionType: RegionTypeE;
};

/** 定位信息T */
export type PointT = {
  /** 定位点x坐标 */
  x: number;
  /** 定位点y坐标 */
  y: number;
};

/** 地图信息T */
export type MapItemT = {
  /** 地图key */
  key: `map_${Range1ToN<1>}_${"a"}`;
  /** 地图网络url地址 */
  url: string;
  /** 地图区域信息 */
  regions: RegionT[];
  /** 地图的拥有者 */
  owner: string;
};

// 所有地图统一管理
export const maps: MapItemT[] = [
  {
    key: "map_1_a",
    url: spiritIslandMapImg.map_1_a,
    owner: "",
    regions: [
      {
        key: "map_1_a_0",
        url: spiritIslandMapImg.map_1_a_0,
        pos: {
          x: 64.38,
          y: 139,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 0,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 0,
        regionType: RegionTypeE.ocean,
      },
      {
        key: "map_1_a_1",
        url: spiritIslandMapImg.map_1_a_1,
        pos: {
          x: 462,
          y: 102.9,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 0,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 1,
        regionType: RegionTypeE.mountain,
      },
      {
        key: "map_1_a_2",
        url: spiritIslandMapImg.map_1_a_2,
        pos: {
          x: 224,
          y: 258.52,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 1,
        daangCount: 1,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 2,
        regionType: RegionTypeE.wetland,
      },
      {
        key: "map_1_a_3",
        url: spiritIslandMapImg.map_1_a_3,
        pos: {
          x: 60,
          y: 732.5,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 2,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 3,
        regionType: RegionTypeE.forest,
      },
      {
        key: "map_1_a_4",
        url: spiritIslandMapImg.map_1_a_4,
        pos: {
          x: 432.5,
          y: 519.5,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 0,
        polluteCount: 1,
        spiritCount: {},
        regionNumber: 4,
        regionType: RegionTypeE.sand,
      },
      {
        key: "map_1_a_5",
        url: spiritIslandMapImg.map_1_a_5,
        pos: {
          x: 651.5,
          y: 334.97,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 0,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 5,
        regionType: RegionTypeE.wetland,
      },
      {
        key: "map_1_a_6",
        url: spiritIslandMapImg.map_1_a_6,
        pos: {
          x: 713.26,
          y: 122.43,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 1,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 6,
        regionType: RegionTypeE.mountain,
      },
      {
        key: "map_1_a_7",
        url: spiritIslandMapImg.map_1_a_7,
        pos: {
          x: 858.73,
          y: 394,
        },
        explorerCount: 0,
        villageCount: 0,
        townCount: 0,
        daangCount: 2,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 7,
        regionType: RegionTypeE.sand,
      },
      {
        key: "map_1_a_8",
        url: spiritIslandMapImg.map_1_a_8,
        pos: {
          x: 973.5,
          y: 58,
        },
        explorerCount: 0,
        villageCount: 1,
        townCount: 0,
        daangCount: 0,
        polluteCount: 0,
        spiritCount: {},
        regionNumber: 8,
        regionType: RegionTypeE.forest,
      },
    ],
  },
];
