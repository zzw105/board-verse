import { spiritIslandMapImg } from "@board-verse/common";

/** 地图区域信息T */
export interface RegionT {
  /** 区域key */
  key: string;
  /** 区域网络url地址 */
  url: string;
  /** 区域在地图中的位置，用于画布定位 */
  pos: PointT;
}

/** 定位信息T */
export interface PointT {
  /** 定位点x坐标 */
  x: number;
  /** 定位点y坐标 */
  y: number;
}

/** 地图信息T */
export interface MapItemT {
  /** 地图key */
  key: string;
  /** 地图网络url地址 */
  url: string;
  /** 地图区域信息 */
  regions: RegionT[];
}

// 所有地图统一管理
export const maps: MapItemT[] = [
  {
    key: "map_1_a",
    url: spiritIslandMapImg.map_1_a,
    regions: [
      {
        key: "map_1_a_0",
        url: spiritIslandMapImg.map_1_a_0,
        pos: {
          x: 64.38,
          y: 139,
        },
      },
      {
        key: "map_1_a_1",
        url: spiritIslandMapImg.map_1_a_1,
        pos: {
          x: 462,
          y: 102.9,
        },
      },
      {
        key: "map_1_a_2",
        url: spiritIslandMapImg.map_1_a_2,
        pos: {
          x: 224,
          y: 258.52,
        },
      },
      {
        key: "map_1_a_3",
        url: spiritIslandMapImg.map_1_a_3,
        pos: {
          x: 60,
          y: 732.5,
        },
      },
      {
        key: "map_1_a_4",
        url: spiritIslandMapImg.map_1_a_4,
        pos: {
          x: 432.5,
          y: 519.5,
        },
      },
      {
        key: "map_1_a_5",
        url: spiritIslandMapImg.map_1_a_5,
        pos: {
          x: 651.5,
          y: 334.97,
        },
      },
      {
        key: "map_1_a_6",
        url: spiritIslandMapImg.map_1_a_6,
        pos: {
          x: 713.26,
          y: 122.43,
        },
      },
      {
        key: "map_1_a_7",
        url: spiritIslandMapImg.map_1_a_7,
        pos: {
          x: 858.73,
          y: 394,
        },
      },
      {
        key: "map_1_a_8",
        url: spiritIslandMapImg.map_1_a_8,
        pos: {
          x: 973.5,
          y: 58,
        },
      },
    ],
  },
];
