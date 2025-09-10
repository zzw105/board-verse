<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Client } from "boardgame.io/client";
import type { State } from "boardgame.io";
import { Splendor } from "../../server/splendor";

type GemType = "diamond" | "sapphire" | "emerald" | "ruby" | "onyx" | "gold";

interface PlayerState {
  gems: Record<GemType, number>;
  cards: string[];
}

interface SplendorState {
  players: Record<string, PlayerState>;
  gems: Record<GemType, number>;
  cards: { id: string; cost: Partial<Record<GemType, number>> }[];
}

const gems = ref<Partial<Record<GemType, number>>>({});
const playerGems = ref<Partial<Record<GemType, number>>>({});

const client = Client<SplendorState>({
  game: Splendor,
  multiplayer: { server: "http://localhost:8000" },
});

onMounted(() => {
  client.start();

  client.subscribe((state: State<SplendorState> | null) => {
    if (state) {
      gems.value = state.G.gems;
      const player = state.G.players[state.ctx.currentPlayer];
      playerGems.value = player?.gems || {};
    }
  });
});

function takeGem(type: GemType) {
  client.moves.takeGems([type]);
}
</script>

<template>
  <div class="p-4">
    <h1>璀璨宝石 - 基础框架 (TS)</h1>

    <h2>公共宝石池</h2>
    <ul>
      <li v-for="(count, gem) in gems" :key="gem">
        {{ gem }}: {{ count }}
        <button @click="takeGem(gem as GemType)">拿 1 个</button>
      </li>
    </ul>

    <h2>我的宝石</h2>
    <ul>
      <li v-for="(count, gem) in playerGems" :key="gem">{{ gem }}: {{ count }}</li>
    </ul>
  </div>
</template>
