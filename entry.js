/**
 * @description babel方式的入口
 */
// 让代码能使用import
require("@babel/polyfill")
require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      "targets": {
        "node": "current"
      }
    }]
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
})
require('./app')