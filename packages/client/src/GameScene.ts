// src/GameScene.ts
import Phaser from "phaser";
import { Client } from "colyseus.js";
import type { Ref } from "vue";

interface Props {
  count: Ref<number>;
  pos: { x: number; y: number };
}

export default class GameScene extends Phaser.Scene {
  private container!: Phaser.GameObjects.Container;
  private circle!: Phaser.GameObjects.Graphics;
  private room: any;
  private props: Props;

  constructor(props: Props) {
    super("GameScene");
    this.props = props;
  }

  async create() {
    // 连接 Colyseus
    const client = new Client("ws://localhost:2567");
    this.room = await client.joinOrCreate("my_room");
    console.log(this.room);

    // 初始位置
    const startX = this.room.state.x;
    const startY = this.room.state.y;

    this.container = this.add.container(startX, startY);

    this.circle = this.add.graphics();
    this.circle.fillStyle(0xff4444, 1);
    this.circle.fillCircle(0, 0, 20);

    this.container.add(this.circle);

    this.container.setSize(40, 40);
    this.container.setInteractive(new Phaser.Geom.Circle(20, 20, 20), Phaser.Geom.Circle.Contains);

    // 点击
    this.container.on("pointerdown", () => this.room.send("click"));

    // 拖拽
    this.input.setDraggable(this.container);
    this.input.on("drag", (_p: any, _obj: any, x: number, y: number) => this.room.send("drag", { x, y }));

    // 状态同步
    this.room.onStateChange((state: any) => {
      this.container.x = state.x;
      this.container.y = state.y;
      this.props.pos.x = state.x;
      this.props.pos.y = state.y;
      this.props.count.value = state.count;
    });
  }
}
