import Phaser from "phaser";

import type { MapItemT } from "./maps";

export default class MapManager {
  private scene: Phaser.Scene;
  private mapImage!: Phaser.GameObjects.Image;
  private mapInfo!: MapItemT;
  private regions: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene, mapInfo: MapItemT) {
    this.scene = scene;
    this.mapInfo = mapInfo;
  }

  preload() {
    // 加载地图
    this.scene.load.image(this.mapInfo.key, this.mapInfo.url);
    this.mapInfo.regions.forEach((item) => {
      this.scene.load.image(item.key, item.url);
    });
  }

  create() {
    // 添加地图
    this.mapImage = this.scene.add.image(0, 0, this.mapInfo.key).setOrigin(0, 0);
    this.regions = this.mapInfo.regions.map((item) => {
      const region = this.scene.add.image(item.pos.x, item.pos.y, item.key).setOrigin(0, 0);
      region.setInteractive({
        pixelPerfect: true, // 启用像素级检测
        useHandCursor: true, // 鼠标悬停显示手型（可选）
      });

      region.alpha = 0.001;
      region.on(
        Phaser.Input.Events.POINTER_OVER,
        () => {
          console.log("pointer over ", item.key);
          region.alpha = 0.08;
        },
        this,
      );
      region.on(
        Phaser.Input.Events.POINTER_OUT,
        () => {
          console.log("pointer out ", item.key);
          region.alpha = 0.001;
        },
        this,
      );
      return region;
    });
  }
}
