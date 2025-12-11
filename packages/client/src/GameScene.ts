import Phaser from "phaser";
import type { Ref } from "vue";

interface GameSceneProps {
  count: Ref<number>;
  pos: { x: number; y: number };
}

export default class GameScene extends Phaser.Scene {
  private circle!: Phaser.GameObjects.Graphics;
  private container!: Phaser.GameObjects.Container;

  private props: GameSceneProps;

  constructor(props: GameSceneProps) {
    super("GameScene");
    this.props = props;
  }

  create() {
    // 初始位置
    const startX = 200;
    const startY = 150;

    // 创建容器（容器有自己的 x/y）
    this.container = this.add.container(startX, startY);

    // 创建小球
    this.circle = this.add.graphics();
    this.circle.fillStyle(0xff4444, 1);
    this.circle.fillCircle(0, 0, 20); // 原点在中心

    // 添加到容器
    this.container.add(this.circle);

    // 点击事件
    this.container.setSize(40, 40);
    this.container.setInteractive(new Phaser.Geom.Circle(20, 20, 20), Phaser.Geom.Circle.Contains);

    this.container.on("pointerdown", () => {
      this.props.count.value++;
    });

    // 开启拖拽
    this.input.setDraggable(this.container);

    this.input.on("drag", (_pointer: any, obj: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
      obj.x = dragX;
      obj.y = dragY;

      this.props.pos.x = Math.round(dragX);
      this.props.pos.y = Math.round(dragY);
    });
  }
}
