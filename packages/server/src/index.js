const { Server, Origins } = require("boardgame.io/server");
const { splendorGame, splendorGameTest, theCastlesOfBurgundyGame } = require("@game/shared");
const cors = require("@koa/cors");
const server = Server({
  games: [splendorGame, splendorGameTest, theCastlesOfBurgundyGame],
  origins: ["*"],
});
// server.router.use("/api/create", async (ctx, next) => {
//   // Decide number of players etc. based on some other API.
//   console.log(ctx);
//   // Set request body to be used by the create game route.
//   // ctx.request.body.numPlayers = numPlayers;
//   // ctx.request.body.setupData = setupData;
//   next();
// });
server.router.use(
  cors({
    origin: "*", // 或 'https://yourdomain.com'
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true, // 如果前端带 cookie
  })
);

server.run(9002);
