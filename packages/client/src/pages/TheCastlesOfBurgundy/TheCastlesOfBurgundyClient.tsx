import { theCastlesOfBurgundyGame } from "@game/shared";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import { TheCastlesOfBurgundyBoard } from "../../components/SplendorBoard/TheCastlesOfBurgundyBoard";

export const TheCastlesOfBurgundyClient = Client({
  game: theCastlesOfBurgundyGame,
  board: TheCastlesOfBurgundyBoard,
  multiplayer: SocketIO({ server: import.meta.env.VITE_API_URL }),
});
