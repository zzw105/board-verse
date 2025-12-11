<template>
  <div class="app">
    <h2>Vue + Phaser + TypeScript Demo</h2>

    <div>
      <p>
        点击次数（响应式）: <strong>{{ count }}</strong>
      </p>
      <p>圆的位置: x={{ pos.x }}, y={{ pos.y }}</p>
    </div>

    <div ref="gameContainer" class="game-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Phaser from "phaser";
import GameScene from "./GameScene";

const gameContainer = ref<HTMLDivElement | null>(null);

// Vue 响应式状态
const count = ref(0);
const pos = reactive({ x: 0, y: 0 });

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 500,
    height: 400,
    parent: gameContainer.value!,
    backgroundColor: "#202020",
    scene: new GameScene({ count, pos }), // 传入 Vue ref
  });
});
</script>

<style>
.game-container {
  width: 500px;
  height: 400px;
  border: 1px solid #444;
  margin-top: 10px;
}
</style>
