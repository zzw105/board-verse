import type { Ref } from "vue";

import { SpiritIslandRoomStatT, maps } from "@board-verse/common";
import { Client, Room } from "colyseus.js";
import Phaser from "phaser";

import MapManager from "./map/MapManager";

interface Props {
  room: Room<SpiritIslandRoomStatT>;
}

export default class GameScene extends Phaser.Scene {
  private room!: Room<SpiritIslandRoomStatT>;
  private allMap!: MapManager[];

  constructor(props: Props) {
    super("GameScene");
    this.room = props.room;
  }

  preload() {
    this.allMap = maps.map((map) => {
      return new MapManager(this, map);
    });
    this.allMap.forEach((map) => map.preload());
  }

  async create() {
    // 连接 Colyseus

    this.room.onMessage("*", (type, message) => {
      console.log(type, message);
    });

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
