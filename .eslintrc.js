module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {                          //指定代码的运行环境
    browser: true,
    node: true,
  },
  rules: {
    // 禁止使用 var
    'no-var': "error",
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': [
      "error",
      "interface"
    ],
    "@typescript-eslint/no-namespace": "off",
  }
}