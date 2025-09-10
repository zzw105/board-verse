import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

/** 类型定义，方便 TS 校验 */
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

/** 游戏逻辑 */
const Splendor: Game = {
  name: "splendor",

  setup: (): SplendorState => ({
    players: {},
    gems: {
      diamond: 7,
      sapphire: 7,
      emerald: 7,
      ruby: 7,
      onyx: 7,
      gold: 5,
    },
    cards: [
      { id: "card1", cost: { diamond: 1, ruby: 1 } },
      { id: "card2", cost: { emerald: 2 } },
    ],
  }),

  moves: {
    takeGems(G: any, ctx: any, chosen: GemType[]) {
      if (chosen.length > 3) return INVALID_MOVE;

      for (let gem of chosen) {
        if (G.gems[gem] <= 0) return INVALID_MOVE;
      }

      if (!G.players[ctx.currentPlayer]) {
        G.players[ctx.currentPlayer] = {
          gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0, gold: 0 },
          cards: [],
        };
      }

      chosen.forEach((gem) => {
        G.gems[gem] -= 1;
        G.players[ctx.currentPlayer].gems[gem] += 1;
      });
    },

    buyCard(G: any, ctx: any, cardId: string) {
      const player = G.players[ctx.currentPlayer];
      if (!player) return INVALID_MOVE;

      const card = G.cards.find((c: any) => c.id === cardId);
      if (!card) return INVALID_MOVE;

      // 简化逻辑：不扣除宝石
      player.cards.push(card.id);
      G.cards = G.cards.filter((c: any) => c.id !== cardId);
    },
  },
};

export { Splendor };
