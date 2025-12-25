import { MapItemConfigT, MapItemStateT, RegionItemBaseT, createMapState, getRegionInfo } from "@board-verse/common";
import Phaser from "phaser";

export default class MapManager {
  private scene: Phaser.Scene;
  private mapImage!: Phaser.GameObjects.Image;

  private groupMap = new Map<"regionsGroup", Phaser.GameObjects.Group>();

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
    this.mapImage.setName(this.mapConfig.key);
    this.groupMap.set("regionsGroup", this.scene.add.group());
    const regionsGroup = this.groupMap.get("regionsGroup")!;
    for (const [_, item] of Object.entries(this.mapConfig.regions)) {
      const region = this.scene.add.image(item.pos.x, item.pos.y, item.key).setOrigin(0, 0);
      region.setName(item.key);
      regionsGroup.add(region);
      region.setInteractive({
        pixelPerfect: true, // 启用像素级检测
        useHandCursor: true, // 鼠标悬停显示手型（可选）
      });
      region.alpha = 0.001;

      const regionCenter = region.getCenter();
      this.scene.add.text(regionCenter.x, regionCenter.y, item.regionNumber.toString(), {
        color: "#727272ff",
        fontSize: "30px",
      });
    }

    this.bindRegionEvents();
  }

  /** 绑定区域事件 */
  bindRegionEvents() {
    const regionsGroup = this.groupMap.get("regionsGroup")!.getChildren() as Phaser.GameObjects.Image[];
    regionsGroup.forEach((region) => {
      region.on(Phaser.Input.Events.POINTER_OVER, () => {
        console.log("pointer over ", region);
        region.alpha = 0.08;
        const regionInfo = getRegionInfo(this.mapState, region.name);
        if (!regionInfo) return;
        regionInfo.adjacentRegionKeys.forEach((adjacentRegionKey) => {
          const adjacentRegion = regionsGroup.find((r) => r.name === adjacentRegionKey);
          if (adjacentRegion) {
            adjacentRegion.alpha = 0.7;
          }
        });
      });
      region.on(Phaser.Input.Events.POINTER_OUT, () => {
        regionsGroup.forEach((r) => {
          r.alpha = 0.001;
        });
      });
    });
  }
}
