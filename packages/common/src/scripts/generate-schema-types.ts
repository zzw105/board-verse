/**
 * Schema → Type generator for Colyseus v3
 * - 只 import server build 后的 JS（避免 tsconfig / decorator 地雷）
 * - 自动生成 interface
 * - 自动分析并生成 import type
 * - 生成到 common 包供 client 使用
 */
/* ===== 必须最先执行 ===== */
import "reflect-metadata";

/* ===== Node ===== */
import fs from "fs";
// @ts-ignore
import { globSync } from "glob";
import path from "path";
import { pathToFileURL } from "url";

/* ===== 路径配置 ===== */
const SCHEMA_DIR = path.resolve("../../packages/server/dist/rooms/schema");
const OUT_DIR = path.resolve("../../packages/common/src/generated");

console.log("SCHEMA_DIR:", SCHEMA_DIR);
console.log("OUT_DIR:", OUT_DIR);

/* ===== 类型映射 ===== */
function typeToTs(type: any, deps: Set<string>): string {
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";

  // ArraySchema<T>
  if (Array.isArray(type)) {
    return `${typeToTs(type[0], deps)}[]`;
  }

  // MapSchema<T>
  if (type?.map) {
    return `Record<string, ${typeToTs(type.map, deps)}>`;
  }

  // Schema class
  if (typeof type === "function") {
    const name = `${type.name}T`;
    deps.add(name);
    return name;
  }

  return "any";
}

/* ===== 单文件生成 ===== */
async function generate(schemaPath: string) {
  const url = pathToFileURL(schemaPath).href;
  const mod = await import(url);

  for (const _cls of Object.values(mod)) {
    const cls = _cls as any;
    // @ts-ignore
    const metadata = (cls as any)?.[Symbol.metadata];
    if (!metadata) continue;

    const deps = new Set<string>();
    const body: string[] = [];

    body.push(`export interface ${cls.name}T {`);

    for (const key of Object.keys(metadata)) {
      const field = metadata[key];
      body.push(`  ${field.name}: ${typeToTs(field.type, deps)};`);
    }

    body.push("}");

    // import type（排除自己）
    const imports = [...deps]
      .filter((d) => d !== `${cls.name}T`)
      .sort()
      .map((d) => `import type { ${d} } from "./${d}";`);

    const content = [...imports, imports.length ? "" : null, ...body, ""].filter(Boolean).join("\n");

    fs.writeFileSync(path.join(OUT_DIR, `${cls.name}T.ts`), content, "utf-8");

    console.log("✔ generated", `${cls.name}T.ts`);
  }
}

/* ===== index.ts 生成 ===== */
function generateIndex(files: string[]) {
  const lines = files
    .map((f) => path.basename(f, ".ts"))
    .filter((n) => n.endsWith("T"))
    .map((n) => `export type { ${n} } from "./${n}";`);

  fs.writeFileSync(path.join(OUT_DIR, "index.ts"), lines.join("\n") + "\n", "utf-8");

  console.log("✔ generated index.ts");
}

/* ===== 主入口 ===== */
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const schemaFiles = globSync(`${SCHEMA_DIR}/**/*.js`);
  for (const file of schemaFiles) {
    await generate(file);
  }

  const generated = globSync(`${OUT_DIR}/*.ts`);
  generateIndex(generated);
}

main().catch((err) => {
  console.error("❌ schema type generation failed");
  console.error(err);
  process.exit(1);
});
