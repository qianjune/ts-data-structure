new Date();
new RegExp();
new String();
new Boolean();
// new Array()
new Function();
new Symbol();
new Math();
new JSON();
{
}
new Error();
null;
undefined;
new Map();
new Set();
new WeakMap();
new WeakSet();


instanceof
  //基本类型
  null
undefined
number
boolean
string
// 引用类型
function
  object
array

typeof
  "number"、"string"、"boolean"、"object"、"function" 和 "undefined"
typeof 不存在的变量 = “undefined”
typeof 对象 = “object”
typeof null = "object"
typeof 数组 = “object”
typeod 方法的实例（比如 new Array() ） =“object”
对象，数组 都是引用类型， 使用typeof 结果是 object类型，但是null 是基本数据类型，使用typeof结果也是 object，

function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null)
      return false;
    if (O === L)  // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}
