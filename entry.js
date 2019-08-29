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
  plugins:[
    "@babel/plugin-proposal-class-properties"
  ]
})
require('./app')