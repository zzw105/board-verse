import type { Game } from "boardgame.io";

export type TheCastlesOfBurgundyGameType = {};

export const theCastlesOfBurgundyMonorepoGame: Game<TheCastlesOfBurgundyGameType> = {
  name: "theCastlesOfBurgundyMonorepo",
  setup: ({ ctx, random }) => {
    return {};
  },
  moves: {},

  endIf: ({ G, ctx }) => {},
};
