import { splendorGame } from "@game/shared";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import { SplendorBoard } from "../../components/SplendorBoard/SplendorBoard";

export const SplendorClient = Client({
  game: splendorGame,
  board: SplendorBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
});
