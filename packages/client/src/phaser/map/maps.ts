import { spiritIslandImg } from "../../utils/imgs";

export interface RegionT {
  name: string;
  url: string;
  pos: PointT;
}

export interface PointT {
  x: number;
  y: number;
}

export interface MapItemT {
  key: string; // Phaser 加载时的 key
  url: string; // 地图图片地址
  regions: RegionT[]; // 区域信息
}

// 所有地图统一管理
export const maps: MapItemT[] = [
  {
    key: "map_1_a",
    url: spiritIslandImg.map.map_1_a,

    regions: [
      {
        name: "map_1_a_0",
        url: spiritIslandImg.map.map_1_a_0,
        pos: {
          x: 64.38,
          y: 139,
        },
      },
      {
        name: "map_1_a_1",
        url: spiritIslandImg.map.map_1_a_1,
        pos: {
          x: 462,
          y: 102.9,
        },
      },
      {
        name: "map_1_a_2",
        url: spiritIslandImg.map.map_1_a_2,
        pos: {
          x: 224,
          y: 258.52,
        },
      },
      {
        name: "map_1_a_3",
        url: spiritIslandImg.map.map_1_a_3,
        pos: {
          x: 60,
          y: 732.5,
        },
      },
      {
        name: "map_1_a_4",
        url: spiritIslandImg.map.map_1_a_4,
        pos: {
          x: 432.5,
          y: 519.5,
        },
      },
      {
        name: "map_1_a_5",
        url: spiritIslandImg.map.map_1_a_5,
        pos: {
          x: 651.5,
          y: 334.97,
        },
      },
      {
        name: "map_1_a_6",
        url: spiritIslandImg.map.map_1_a_6,
        pos: {
          x: 713.26,
          y: 122.43,
        },
      },
      {
        name: "map_1_a_7",
        url: spiritIslandImg.map.map_1_a_7,
        pos: {
          x: 858.73,
          y: 394,
        },
      },
      {
        name: "map_1_a_8",
        url: spiritIslandImg.map.map_1_a_8,
        pos: {
          x: 973.5,
          y: 58,
        },
      },
    ],
  },
];
