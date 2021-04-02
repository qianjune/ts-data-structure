| Where | What          | How       |
| ----- | ------------- | --------- |
|       | 页面名字/路径 | 进去页面  |
|       | 页面名字/路径 | 离开页面  |
|       |               | 点击事件  |
|       |               | 进去app   |
|       |               | 离开app   |
|       |               | 滚动/滑动 |
|       |               |           |
|       |               |           |
|       |               |           |

用户页面浏览流程纪律



```
数据分析（一）什么是埋点
https://www.jianshu.com/p/3e18c16373a2

数据分析（二）如何做好数据埋点
https://www.jianshu.com/p/b0051361ecfa

数据分析（三）用户行为分析
https://www.jianshu.com/p/7858926ff399

```



用户浏览路径树状图-需要属性分析：

```typescript
interface BrowsePath{
  preBrowseActionId: number; // 前一个浏览记录id
  page: string; // 前一个浏览记录id
  nextBrowseActionId: number; // 下一个浏览记录id
  createTime: string; // 创建时间
  userId: number; // 用户id
}
```



| action       | Desc           |               |
| ------------ | -------------- | ------------- |
| navigateTo   | 跳转到下个页面 | current/next  |
| navigateBack | 回到上个页面   | Current/next  |
| didShow      | 页面展示       | (Pre)/current |
| didUnmount   | 页面离开       | (Pre)/current |
|              |                |               |
|              |                |               |
|              |                |               |
|              |                |               |
|              |                |               |

页面路径config



