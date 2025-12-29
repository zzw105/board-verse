<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { SpiritIslandRoomSchemaT } from "@board-verse/common";
import { Client } from "colyseus.js";

import { SceneManager } from "./three/SceneManager";

const gameContainer = ref<HTMLDivElement | null>(null);
let sceneManager: SceneManager | null = null;

onMounted(() => {
  const client = new Client("ws://localhost:2567");
  client.joinOrCreate<SpiritIslandRoomSchemaT>("spirit_island_room").then((room) => {
    setTimeout(() => {
      console.log("Joined room:", JSON.stringify(room.state.map.get("init")));
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
