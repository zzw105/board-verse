<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { SpiritIslandRoomS } from "@board-verse/common";
import { Client } from "colyseus.js";

import { SceneManager } from "./three/SceneManager";

const gameContainer = ref<HTMLDivElement | null>(null);
let sceneManager: SceneManager | null = null;

onMounted(() => {
  const client = new Client("ws://localhost:2567");
  client.joinOrCreate<SpiritIslandRoomS>("spirit_island_room").then((room) => {
    setTimeout(() => {
      const map = room.state.toJSON().map;
      console.log("Joined room:", room.state.toJSON().map);
    }, 1000);

    if (gameContainer.value) {
      sceneManager = new SceneManager(gameContainer.value);
      sceneManager.start();

      window.addEventListener("resize", sceneManager.resize);
    }
  });
});

onBeforeUnmount(() => {
  if (sceneManager) {
    sceneManager.stop();
    window.removeEventListener("resize", sceneManager.resize);
  }
});
</script>

<style>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
