import type { Game } from "boardgame.io";

export type TheCastlesOfBurgundyGameType = {};

export const theCastlesOfBurgundyGame: Game<TheCastlesOfBurgundyGameType> = {
  name: "theCastlesOfBurgundyMonorepo",
  setup: ({ ctx, random }) => {
    return {};
  },
  phases: {
    play: {
      moves: {},
    },
  },

  endIf: ({ G, ctx }) => {},
};
