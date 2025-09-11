const { Server, Origins } = require("boardgame.io/server");
const { splendorGame } = require("@game/shared");
const server = Server({
  games: [splendorGame],
  origins: [Origins.LOCALHOST],
});
// server.router.use("/api/create", async (ctx, next) => {
//   // Decide number of players etc. based on some other API.
//   console.log(ctx);
//   // Set request body to be used by the create game route.
//   // ctx.request.body.numPlayers = numPlayers;
//   // ctx.request.body.setupData = setupData;
//   next();
// });

server.run(8000);
