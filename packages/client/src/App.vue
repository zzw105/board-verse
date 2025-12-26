<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { SceneManager } from "./three/SceneManager";

const gameContainer = ref<HTMLDivElement | null>(null);
let sceneManager: SceneManager | null = null;

onMounted(() => {
  if (gameContainer.value) {
    sceneManager = new SceneManager(gameContainer.value);
    sceneManager.start();

    window.addEventListener("resize", sceneManager.resize);
  }
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
