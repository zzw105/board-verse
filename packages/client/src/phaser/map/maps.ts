import map1_RegionA from "../../assets/Vector 1 (1).png";
import map_a from "../../assets/map_a.png";

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
    key: "map_a",
    url: map_a,

    regions: [
      {
        name: "map_a_0",
        url: map1_RegionA,
        pos: {
          x: 63,
          y: 139,
        },
      },
    ],
  },
];
