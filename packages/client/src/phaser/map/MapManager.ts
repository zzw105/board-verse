import Phaser from "phaser";

import type { MapItemT } from "./maps";

export default class MapManager {
  private scene: Phaser.Scene;
  private mapImage!: Phaser.GameObjects.Image;
  private cam: Phaser.Cameras.Scene2D.Camera;
  private mapInfo!: MapItemT;

  constructor(scene: Phaser.Scene, cam: Phaser.Cameras.Scene2D.Camera, mapInfo: MapItemT) {
    this.scene = scene;
    this.cam = cam;
    this.mapInfo = mapInfo;
  }

  preload() {
    // 加载地图
    this.scene.load.image(this.mapInfo.key, this.mapInfo.url);
  }

  create() {
    // 添加地图
    this.mapImage = this.scene.add.image(0, 0, this.mapInfo.key).setOrigin(0, 0);
  }
}
