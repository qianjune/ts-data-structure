// while并不比for快特别多，你可以自己试试，作者的意思是for in慢，而不是for慢。
// for / while 都挺快的，
// forEach / map/ for of次之，
// 真正慢的是for in方法。for in要读属性和原型链所以慢的要死。

// hasOwnProperty不被建议直接使用，
// Object.prototype.hasOwnProperty.call(desc, 'value') 这样比较好一些

// 好文章，不过有两点建议。1:函数clone部分去掉吧，涉及到多层柯里化，没法搞，而且函数本身的原型等，你也没考虑， 如果无法完美实现真不如去掉。函数clone实在是没遇到过这个需求。2: getInit方法里面，为何要new target.constructor() ? 如果这样的话，新生成的对象虽然原型是继承了，但是构造函数也执行了，有一定的性能浪费，而且还很可能得到的不是一个空对象，后面又逐个替换属性，着实没必要。可以考虑这样，cloneTarget = Object.create(target.constructor.prototype)，与之前的相比，这个会生成一个空对象，而且继承关系也对，构造函数不会被调用，供参考。

// 码一下，我觉得超级无敌惊艳的还是lodash的深拷贝位标识的实现，感觉面试官眼睛直接亮瞎

// 递归爆栈还没解决呢

// 其实JSON.parse(JSON.stringify(obj))已经在实际业务中够用了

// eval的正确用法难道不是你这样的吗？var a = function() {};
// eval('(' + a.toString() + ')');
// 函数这样复制不就ok了

// Symbol拷贝是不是有问题？
// function cloneSymbol(target) {
//  return Object(Symbol.prototype.valueOf.call(target));
// }
// 改成这样的：Symbol(target.description)，会不会更好一些？
// 参考： developer.mozilla.org

// 看了下lodash的源码，它的对象是通过Object.create(Object.getPrototype(target))来创建的，这样不会丢失原型方法，楼主可以优化一哈。

// symbol 有基本类型和包装类型两种，类似 number 一样，const n = 1 和 const n = Number(1) 是不一样的。对于包装类型，typeof 运算后得到的是 'object'。文中主代码一开始就使用 isObject() 判断是否是 'object' 类型，如果是才会进入后续对象的克隆过程，所以这里的使用 Object() 包装是因为源数据本来就是包装过的。

// 楼主我测了下的确不能拷贝Symbol啊，你没用Object.getOwnPropertySymbols去取，直接Object.keys应该拿不到吧
// 应该用 Reflect.ownKeys 。这个可以取到而且不用判断原型上的值

// 读了下发现部分代码是多余的：
// 经过isObject后，显然(Number String Boolean Symbol Undefined Null)这些类型都是不会往下走的而是直接返回的
// 但是发现cloneOtherType还是有对（Number String Boolean Symbol ）的处理，我认为后面应该是没有必要再处理的
// new Number() new String() 这种包装类型会走

// 面试官还让考虑buffer的兼容。

// 请教一下，Object(Symbol.prototype.valueOf.call(target))为什么用Symbol.prototype.valueOf.call()拷贝Symbol？
// 我回答一下 因为要拷贝Obejct(Symbol...)这种包装类型的场景 基本类型Symbol直接返回就行

// 面试官还让考虑到冻结的对象
