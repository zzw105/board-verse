const { Server, Origins } = require("boardgame.io/server");
const { splendorGame } = require("@game/shared");
const server = Server({
  games: [splendorGame],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
