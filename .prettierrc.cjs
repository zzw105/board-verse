/* eslint-disable */
module.exports = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports"), require.resolve("prettier-plugin-css-order")],

  // import 排序规则
  importOrder: [
    "^vue$", // Vue 最前
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  importOrderParserPlugins: ["typescript", "decorators-legacy"],

  // CSS 排序规则
  cssOrder: "alphabetical",

  parser: "typescript",

  printWidth: 120,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  semi: true,
  arrowParens: "always",

  // 针对 Vue 文件
  overrides: [
    {
      files: ["*.vue"],
      options: {
        parser: "vue", // 告诉 Prettier 用 Vue 解析器
      },
    },
  ],
};
