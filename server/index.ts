import { Server } from "boardgame.io/server";
import { Splendor } from "./splendor";

const server = Server({
  games: [Splendor],
});

server.run(8000, () => {
  console.log("✅ Splendor server running on http://localhost:8000");
});
