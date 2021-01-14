const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["prettier", "import", "@typescript-eslint",],
  env: {
    //指定代码的运行环境
    browser: true,
    node: true,
  },
  rules: {
    // endOfLine: "auto",
    // 禁止使用 var
    "no-var": "error",
    "object-shorthand": "error",
    "prettier/prettier": ERROR,
    "object-curly-newline": [
      "error",
      {
        ObjectPattern: { multiline: true },
      },
    ],

    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-namespace": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
      },
    ],
  },
};
