// .prettierrc.cjs
module.exports = {
  // 插件：自动排序 import
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],

  // import 排序规则
  importOrder: [
    "^react$", // React 最前
    "<THIRD_PARTY_MODULES>", // 第三方库
    "^@/components/(.*)$", // 项目内部别名
    "^[./]", // 相对路径
  ],
  importOrderSeparation: true, // 不同组之间空行
  importOrderSortSpecifiers: true, // import {a, b} 内部也排序

  // 尽量少换行
  printWidth: 120, // 超过 120 个字符才换行
  tabWidth: 2, // 缩进宽度
  singleQuote: false,
  trailingComma: "all", // 多行对象/数组尾随逗号
  bracketSpacing: true, // 对象字面量括号内空格
  semi: true, // 使用分号
  arrowParens: "always", // 箭头函数总是带括号
};
