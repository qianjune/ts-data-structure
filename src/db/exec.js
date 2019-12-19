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

require('./sync')