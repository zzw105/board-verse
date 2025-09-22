const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: [__dirname + "/src/index.js"], // 你的入口文件
    bundle: true, // 打包成一个文件
    platform: "node", // 目标是 Node.js
    outfile: "dist/app.js",
    minify: true, // 可选：压缩
  })
  .catch(() => process.exit(1));
