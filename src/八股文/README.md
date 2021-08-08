迈入现代 Web 开发（GMTC 2021 演讲《字节跳动的现代 Web 开发实践》全文）
<https://increment.com/development/the-melting-pot-of-javascript/>
<https://mp.weixin.qq.com/s/0VDBAgEvqB1xiUs540Fu9A>
<https://topic.atatech.org/articles/209395>

### New 一个funtion发生了什么

```
https://cloud.tencent.com/developer/article/1653839
https://blog.csdn.net/qq_17175013/article/details/81915059（一个普通函数的冷僻属性(length、caller、arguments、name、[[Scopes]]和[[FunctionLocation]])）

手作new:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/javascript-new-operator-implementation-8c0d15f2b899

手作instanceof：
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/javascript-instanceof-operator-implementation-ee8f40f9e3b6

聊一聊typeof instanceof 实现原理:
https://juejin.cn/post/6844904199700873223#heading-3
```

### 深拷贝

<https://juejin.cn/post/6844903929705136141#heading-9>

es6
<https://mp.weixin.qq.com/s/NXeGh2cP5LbW-6YXN4HeGQ> (掌握 JS 高级编程基础 - Reflect Metadata)

### i18

<https://mp.weixin.qq.com/s/NC700iM9vfEBWNg35LZPJw> (字节前端如何基于 AST 做国际化重构？)
<https://github.com/alibaba/react-intl-universal> (git )

```
1. 工具包
- 全局扫描中文 // 正则
- 按文案中英文替换
- 下载文案平台的对应项目的数据
2. 文案平台
- 权限划分
- 文案上传下载添加
- 机器翻译
```

### css BFC

BFC: 块级格式化上下文
<https://www.google.com.hk/search?q=css+bfc%E6%98%AF%E4%BB%80%E4%B9%88&oq=css+bf&aqs=chrome.2.69i57j0l3j0i12l6.4792j0j7&sourceid=chrome&ie=UTF-8>

```
普通流
浮动流
绝对定位
// MDN
https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

```

前端 - 文章
<https://github.com/toutiaoio/awesome-architecture#%E5%89%8D%E7%AB%AF>

数据类型
<https://juejin.cn/post/6844903854882947080>

script defer async
<https://zh.javascript.info/script-async-defer>

html meta
<https://www.runoob.com/tags/tag-meta.html>

闭包
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures>

### PM2

<https://www.jianshu.com/p/6b3b506f7d0a> (常用命令)

### flex / Grid

<https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>
<https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/using-css-grid-to-draw-test-card-7ed24d3559ab>

```
// 容器属性
flex-direction
flex-wrap
flex-flow：flex-direction ｜ flex-wrap 的简写
justify-content
align-items
align-content：多根轴线的对齐方式

// 设置在子项目上的属性
order
flex-grow：定义项目放大比例
flex-shrink：定义项目缩小比例
flex-basis：定义项目在分配多余空间时，占主轴的比例
flex：flex-grow ｜ flex-shrink ｜ flex-basis 的简写，默认值为 0 1 auto
align-self：可覆盖父容器的align-items
```

### grid

<https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html>

```
// ---- 容器属性 ----
grid-template-columns：设置格数和长度 //  简写
grid-template-rows：设置格数和长度
// - 数值设置方式
// 1. 100px 100px 100px
// 2. 33% 33% 33%
// 3. repeat(amount,val)
// 4. repeat(auto-fill,100px)
// 5. 1fr 2fr    // - 后一个是前一个的两倍
// 6. 1fr 1fr minmax(100px 1fr)
// 7. [c1] 100px [c2] 100px [c3] 100px // - 给划分区块的线命名
grid-row-gap 设置间距
grid-column-gap 设置间距
grid-gap //grid-row-gap ｜ grid-column-gap 的简写
grid-template-areas // 划分区域
// 'a a a'
// 'b b b'
// 'c c c'
grid-auto-flow // 放置顺序 默认先行后列row，或者先列后行column
// row
// column
// row dense // - dense代表剩余的元素尽可能紧密排列
// ---- 影响单元格内属性 ----
// - stretch 拉伸属性值
justify-items
align-items
place-items justify-items ｜ align-items 简写
justify-content 属性，
align-content 属性，
place-content 属性
// ---- 影响单元格内属性end ----
grid-auto-columns // template范围以为的排列的长度
grid-auto-rows // template范围以为的排列的长度
grid-template： grid-template-columns | grid-template-rows | grid-template-areas 缩写
grid：grid-template-columns | grid-template-rows | grid-template-areas ｜ grid-auto-rows | grid-auto-columns | grid-auto-flow 缩写
```

```
// ---- 子项目属性 ----
grid-column-start 属性，
grid-column-end 属性，
grid-row-start 属性，
grid-row-end 属性
// 制定子项目的网格线具体是哪一根，用于调整某个子项目的位置
// 值可以是网格线的别名或者第几根
// span 2 跨越几个单元格
grid-column ：1/3 // 从1线到3线
grid-row： 1/3
grid-area: e; // 制定放在命名的某个区域上
// grid-area: 1 / 1 / 3 / 3; row-start/colum-start/row-end/
// 上述对应的缩写
column-end
justify-self 属性，
align-self 属性，
place-self 属性
```

### 性能优化

```
https://segmentfault.com/a/1190000016705679 (HTTP缓存（Cache-Control、Expires 、ETag）)

React-memo/useCallBack/useMemo:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3

小型组件用useState，中大型用useReducer:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd

网页性能优化：
https://juejin.cn/post/6910893471339708429
```

### webpack

<https://segmentfault.com/a/1190000039231950> （手写一个webpack，看看AST怎么用）
<https://astexplorer.net/> （看ast结构的网站）
<https://juejin.cn/post/6844903703925751822（webpack由浅入深——（ast、loader和plugin>））
性能优化
<https://juejin.cn/post/6844904067353804814>
<https://segmentfault.com/a/1190000039249651>
<https://www.huaweicloud.com/articles/9cda2e0e3f2ef9e1649a426555da04c5.html>
<https://zhuanlan.zhihu.com/p/150731200>
<https://www.huaweicloud.com/articles/1a21e34dc2d7145b4d22114858f0fd05.html>
<https://leetcode-cn.com/circle/discuss/wqMpBQ/>
<https://cloud.tencent.com/developer/article/1830522>

### Promise

<https://segmentfault.com/a/1190000023157856>

```
從 Promises/A+ 規範瞭解 Promise:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/promises-a-plus-330dda203569

為了瞭解原理，那就來實作一個 Promise 吧!:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/implement-promise-aed55f3e84e9
```

### 网站安全

<https://mp.weixin.qq.com/s/ocozkdPzufTPwnVcH_ah_Q>

经历：

### Decorator lesscode

1. 前端页面拖拽配置 <https://eevee.app.terminus.io/>
2. <https://juejin.cn/post/6844904017487724557#heading-5> (手动搭建一个 SSR 框架)
3. <https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc>

react-dnd:
<https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-dnd-implement-task-board-16ce7f67289c>

2. 后端接口生成页面
<https://trantor-docs-dev.app.terminus.io/v0.17.x/doc/concept/trantor>（官方文档）
<https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html> （【干货】Chrome插件(扩展)开发全攻略）

* 接口注解

b. mobile 组件库

c. 工具包 - 用hooks装用户信息全局数据 / 取地址参数 / 常用的format(价格，时间) / i18

```

扫把发的CV模版参考

技术架构图
业务架构图
https://www.google.com.hk/search?q=%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE&oq=%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84&aqs=chrome.1.69i57j0i512l9.3360j0j7&sourceid=chrome&ie=UTF-8
```

### setPrototypeOf

### 提升

```
第三方包安全：
https://juejin.cn/post/6844904047720267784

Electron:
https://juejin.cn/post/6844903862302670862

Nginx：
https://juejin.cn/post/6844903793918738440#heading-18

useState更新流程：
https://juejin.cn/post/6844903781813993486#heading-13

js精度丢失：
https://juejin.cn/post/6844903789082705934

recoil介绍：
https://juejin.cn/post/6881493149261250568#heading-7

圈复杂度：
https://juejin.cn/post/6844903965792927751
```
