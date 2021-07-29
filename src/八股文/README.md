迈入现代 Web 开发（GMTC 2021 演讲《字节跳动的现代 Web 开发实践》全文）
https://increment.com/development/the-melting-pot-of-javascript/
https://mp.weixin.qq.com/s/0VDBAgEvqB1xiUs540Fu9A
https://topic.atatech.org/articles/209395

New 一个funtion发生了什么
https://cloud.tencent.com/developer/article/1653839
https://blog.csdn.net/qq_17175013/article/details/81915059（一个普通函数的冷僻属性(length、caller、arguments、name、[[Scopes]]和[[FunctionLocation]])）

es6
https://mp.weixin.qq.com/s/NXeGh2cP5LbW-6YXN4HeGQ (掌握 JS 高级编程基础 - Reflect Metadata)

### i18

https://mp.weixin.qq.com/s/NC700iM9vfEBWNg35LZPJw (字节前端如何基于 AST 做国际化重构？)

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
https://www.google.com.hk/search?q=css+bfc%E6%98%AF%E4%BB%80%E4%B9%88&oq=css+bf&aqs=chrome.2.69i57j0l3j0i12l6.4792j0j7&sourceid=chrome&ie=UTF-8

```
普通流
浮动流
绝对定位
// MDN
https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

```

前端 - 文章
https://github.com/toutiaoio/awesome-architecture#%E5%89%8D%E7%AB%AF

数据类型
https://juejin.cn/post/6844903854882947080

script defer async
https://zh.javascript.info/script-async-defer

html meta
https://www.runoob.com/tags/tag-meta.html

闭包
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

### flex

https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

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

https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

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

webpack

经历：

```
a. lesscode
1. 前端页面拖拽配置 https://eevee.app.terminus.io/
2. 后端接口生成页面

b. mobile 组件库

c. 工具包 - 用hooks装用户信息全局数据 / 取地址参数 / 常用的format(价格，时间) / i18
```

扫把发的CV模版参考

技术架构图
业务架构图
https://www.google.com.hk/search?q=%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE&oq=%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84&aqs=chrome.1.69i57j0i512l9.3360j0j7&sourceid=chrome&ie=UTF-8
