import Phaser from "phaser";

export default abstract class BaseMonster extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
  }

  abstract update(time: number, delta: number): void;
}
