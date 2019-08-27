// 让代码能使用import
require("@babel/polyfill")
require('@babel/register')({
  presets: ['@babel/preset-env']
})
require('./app')