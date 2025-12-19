<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { SpiritIslandRoomStatT } from "@board-verse/common";
import { Client } from "colyseus.js";
import Phaser from "phaser";

import GameScene from "./phaser/GameScene";

const gameContainer = ref<HTMLDivElement | null>(null);

let game: Phaser.Game | null = null;

onMounted(() => {
  const client = new Client("ws://localhost:2567");
  client.joinOrCreate<SpiritIslandRoomStatT>("spirit_island_room").then((room) => {
    game = new Phaser.Game({
      type: Phaser.WEBGL,
      parent: gameContainer.value!,
      backgroundColor: "#fff",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameContainer.value!.clientWidth,
        height: gameContainer.value!.clientHeight,
      },
      scene: new GameScene({ room }),
    });
  });
});
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (game) {
      game.destroy(true, false); // 销毁 Phaser 实例和场景
      game = null; // 避免旧引用
    }
  });
}
</script>

<style>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
