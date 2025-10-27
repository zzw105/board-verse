import { splendorPokemonGame } from "@game/shared";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";

import { SplendorPokemonBoard } from "../../components/SplendorPokemonBoard/SplendorPokemonBoard";

export const SplendorPokemonClient = Client({
  game: splendorPokemonGame,
  board: SplendorPokemonBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
  numPlayers: 4,
});
