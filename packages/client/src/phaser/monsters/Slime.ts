import Phaser from "phaser";

import BaseMonster from "./BaseMonster";

export default class Slime extends BaseMonster {
  private sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.add.sprite(0, 0, "slime"); // 预先在 preload 加载
    this.add(this.sprite);
  }

  update(time: number, delta: number) {
    // 简单示例：上下浮动
    this.y += Math.sin(time / 500) * 0.5;
  }
}
