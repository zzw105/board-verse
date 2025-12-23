import { MapItemConfigT, MapItemStateT, RegionItemBaseT, createMapState } from "@board-verse/common";
import Phaser from "phaser";

export default class MapManager {
  private scene: Phaser.Scene;
  private mapImage!: Phaser.GameObjects.Image;
  private regionImages = new Map<RegionItemBaseT["key"], Phaser.GameObjects.Image>();

  private mapConfig: MapItemConfigT;
  private mapState: MapItemStateT;

  constructor(scene: Phaser.Scene, mapConfig: MapItemConfigT) {
    this.scene = scene;
    this.mapConfig = mapConfig;
    this.mapState = createMapState(mapConfig);
  }

  preload() {
    // 加载地图
    this.scene.load.image(this.mapConfig.key, this.mapConfig.url);
    for (const [_, item] of Object.entries(this.mapConfig.regions)) {
      this.scene.load.image(item.key, item.url);
    }
  }

  create() {
    // 添加地图
    this.mapImage = this.scene.add.image(0, 0, this.mapConfig.key).setOrigin(0, 0);

    for (const [_, item] of Object.entries(this.mapConfig.regions)) {
      const region = this.scene.add.image(item.pos.x, item.pos.y, item.key).setOrigin(0, 0);
      region.setInteractive({
        pixelPerfect: true, // 启用像素级检测
        useHandCursor: true, // 鼠标悬停显示手型（可选）
      });

      region.alpha = 0.001;
      region.on(Phaser.Input.Events.POINTER_OVER, () => {
        console.log("pointer over ", item.key);
        region.alpha = 0.08;
        console.log(region);
      });
      region.on(Phaser.Input.Events.POINTER_OUT, () => {
        console.log("pointer out ", item.key);
        region.alpha = 0.001;
      });
      this.regionImages.set(item.key, region);
    }
  }

  /** 绑定区域事件 */
  bindRegionEvents() {
    // this. .forEach((region) => {
    //   region.on(Phaser.Input.Events.POINTER_OVER, () => {
    //     console.log("pointer over ", region);
    //     region.alpha = 0.08;
    //   });
    //   region.on(Phaser.Input.Events.POINTER_OUT, () => {
    //     console.log("pointer out ", region);
    //     region.alpha = 0.001;
    //   });
    // });
  }
}
