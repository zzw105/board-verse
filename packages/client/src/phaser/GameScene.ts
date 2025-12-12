import type { Ref } from "vue";

// import { Client, Room } from "colyseus.js";
import Phaser from "phaser";

import MapManager from "./map/MapManager";
import { maps } from "./map/maps";

interface Props {
  count: Ref<number>;
  pos: { x: number; y: number };
}

export default class GameScene extends Phaser.Scene {
  // private container!: Phaser.GameObjects.Container;
  // private circle!: Phaser.GameObjects.Graphics;
  // private room!: Room<{
  //   x: number;
  //   y: number;
  //   count: number;
  // }>;
  // private props: Props;
  private allMap!: MapManager[];

  constructor(props: Props) {
    super("GameScene");
    // this.props = props;
  }

  preload() {
    this.allMap = maps.map((map) => new MapManager(this, this.cameras.main, map));
    this.allMap.forEach((map) => map.preload());
  }

  async create() {
    // 连接 Colyseus
    // const client = new Client("ws://localhost:2567");
    // this.room = await client.joinOrCreate("my_room");
    // console.log(this.room);

    // 摄像机拖动
    const cam = this.cameras.main;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      isDragging = true;
      // 将屏幕坐标转为世界坐标
      dragStartX = pointer.x / cam.zoom + cam.scrollX;
      dragStartY = pointer.y / cam.zoom + cam.scrollY;
    });

    this.input.on("pointerup", () => {
      isDragging = false;
    });

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!isDragging) return;
      // 考虑缩放比例
      cam.scrollX = dragStartX - pointer.x / cam.zoom;
      cam.scrollY = dragStartY - pointer.y / cam.zoom;
    });

    // 摄像机缩放
    this.input.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _gameObjects: Phaser.GameObjects.GameObject[],
        _deltaX: number,
        deltaY: number,
      ) => {
        cam.zoom = Phaser.Math.Clamp(cam.zoom - deltaY * 0.001, 0.5, 2);
      },
    );

    //
    this.allMap.forEach((map) => map.create());
  }
}
