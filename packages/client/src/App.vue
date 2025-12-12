<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import Phaser from "phaser";

import GameScene from "./phaser/GameScene";

const gameContainer = ref<HTMLDivElement | null>(null);

// Vue 响应式状态
const count = ref(0);
const pos = reactive({ x: 0, y: 0 });

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    parent: gameContainer.value!,
    backgroundColor: "#202020",
    scale: {
      mode: Phaser.Scale.RESIZE, // 自动跟随容器大小
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: gameContainer.value!.clientWidth,
      height: gameContainer.value!.clientHeight,
    },
    scene: new GameScene({ count, pos }), // 传入 Vue ref
  });
});
</script>

<style>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
