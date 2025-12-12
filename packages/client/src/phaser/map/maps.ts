import map1 from "../../assets/map.png";

export interface RegionT {
  name: string;
  points: number[];
}

export interface MapItemT {
  key: string; // Phaser 加载时的 key
  url: string; // 地图图片地址
  regions: RegionT[]; // 区域信息
}

// 所有地图统一管理
export const maps: MapItemT[] = [
  {
    key: "map1",
    url: map1,

    regions: [
      { name: "RegionA", points: [0, 0, 100, 100] },
      { name: "RegionB", points: [100, 100, 200, 200] },
    ],
  },
  // 可以继续添加更多地图
];
