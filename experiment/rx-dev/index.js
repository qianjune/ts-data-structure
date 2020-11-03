/**
 * @description rxjs 学习
 */
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, Scheduler } from 'rxjs'

// const observable = Observable.of('Jerry')
// const observable = Observable.fromEvent(document.body,'click')
// Observable.interval(time)
// Observable.timer(delay,time)
const observable = Observable.from(['Jerry', 'Anna'])
// observable.map
// observable.mapTo
// observable.filter
// observable.take(num)
// observable.first
// observable.takeUntil

// 合成一维数组
// observable.concatAll //把一维 Observable 摊平成以为数组 
// 會處理 source 先發出來的 observable，必須等到這個 observable 結束，才會再處理下一個 source 發出來的 observable
// observable.switch // 类似concatAll，新的observable会把老的替代叼
// observable.mergeAll // 字符组合里ab，可以设置影响几个值的输出
// 合成一维数组
// observable.concatMap // map + concatAll
// observable.switchMap // map + switchAll
// observable.mergeMap // map + mergeAll
// concatMap 用在可以確定內部的 observable 結束時間比外部 observable 發送時間來快的情境，並且不希望有任何並行處理行為，適合少數要一次一次完成到底的的 UI 動畫或特別的 HTTP request 行為。
// switchMap 用在只要最後一次行為的結果，適合絕大多數的使用情境。
// mergeMap 用在並行處理多個 observable，適合需要並行處理的行為，像是多個 I/O 的並行處理。

// observable.skip
// observable.takeLast
// observable.last
// observable.concat(observable1,observable2)
// observable.startWith //设置初始值
// observable.merge // 时间纬度上是同时的
// observable.combineLatest(observable) // 把两个observable 每个节点的值加起来
// observable.zip // index纬度 的 ab处理
// observable.withLatestFrom // 主体发出值才触发
// observable.scan // 相当于.reduce
// observable.buffer // 把a的数据缓存，知道b发出数据，把a缓存的保存后，重新开始缓存
// observable.bufferCount
// observable.bufferTime
// observable.delay // 延迟开始发送数据
// observable.delayWhen // 对每一次发送延迟
// observable.debounceTime // 防抖，单位时间内没有收到新值才会发送，不然新的覆盖老的
// observable.throttleTime // 节流，开始触发一次，后续和debounce类似
// observable.distinct // 去重 ，配置后可定时去重
// observable.distinctUntilChanged // 去重直到值变化
// 用于错误处理
// observable.catch
// observable.retry
// observable.retryWhen
// observable.repeat 
// 用于错误处理

// observable.window // 和 buffer 类似，不是转化为数组，而是转化为Observable
// observable.windowToggle
// observable.groupBy // 根据条件分组

let main = Observable.from('hello').zip(Observable.interval(500), (x, y) => x);
let some = Observable.from([0, 1, 0, 0, 0, 1]).zip(Observable.interval(300), (x, y) => x);

let example = main.withLatestFrom(some, (x, y) => {
  console.log(x, y)
  return y === 1 ? x.toUpperCase() : x;
});
// const subscription = observable.subscribe()
const Observer = {
  next: (value) => {
    console.log(value)
  },
  error: (error) => {
    console.log(error)
  },
  complete: () => {
    console.log('complete!')
  }
}
example.subscribe(Observer)
// subscription.unsubscribe()

// Observable是渐进式取值，一个值运行完全流程，才会第二个值运行-21

const subject = new Subject()
subject.subscribe()
// new BehaviorSubject()
// new ReplaySubject()
// new AsyncSubject()


let source = Observable.interval(1000)
  .do(x => console.log('send: ' + x))
  .multicast(new Subject()) // 無限的 observable 
// .refCount() // refCount 必須搭配 multicast 一起使用，他可以建立一個只要有訂閱就會自動 connect 的 observable
// 同樣的在退訂時只要訂閱數變成 0 就會自動停止發送

// let source = Observable.interval(1000)
//   .do(x => console.log('send: ' + x))
//   .publish() // 等于 multicast(new Rx.Subject())
//   .refCount()

// let source = Observable.interval(1000)
//   .share() // publish + refCount 

let observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

let observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}

const subscriptionA = source.subscribe(observerA)
let realSubscription = source.connect();
let subscriptionB
setTimeout(() => {
  subscriptionB = source.subscribe(observerB)
}, 1000)

setTimeout(() => {
  subscriptionA.unsubscribe()
  subscriptionB.unsubscribe()
  // 這裡雖然 A 跟 B 都退訂了，但 source 還會繼續送元素
}, 5000)

setTimeout(() => {
  realSubscription.unsubscribe()
  // 這裡 source 才會真正停止送元素
}, 7000)


// 26-27开始 Observable 解析

Scheduler // Scheduler 控制一個 observable 的訂閱什麼時候開始，以及發送元素什麼時候送達