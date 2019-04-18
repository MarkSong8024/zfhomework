let EventEmitter = require('events')
// let util = require('util')
class MyEmitter extends EventEmitter { }
// // function MyEmitter() {}
// // util.inherits(MyEmitter, EventEmitter)
// const myEmitter = new MyEmitter()
// let m = 0
// myEmitter.on('event', (a, b) => {
//     // console.log('触发事件', a, b, this)
//     console.log(++m)
//     // setImmediate(() => {
//     //     console.log('异步进行')
//     // })
// })

// myEmitter.once('event', (a, b) => {
//     console.log(++m, a)
// })
// myEmitter.emit('event', 'aaa', 'b')
// myEmitter.emit('event', 'a', 'b')

// 2 抛出错误,打印堆栈跟踪.并退出Node.js进程
// myEvent = new MyEmitter()
// myEvent.on('error', (err) => {
//     console.log(err)
// })
// myEvent.emit('error', new Error('错误信息'))

// 3 当新增监听器. 会触发'newListener'事件,之前触发; 当移除已存在的监听时,则触发'removeListener'事件,移除之后触发

// const myEmitter = new MyEmitter();
// // 只处理一次，避免无限循环。
// myEmitter.once('newListener', (event, listener) => {
//     console.log(event, listener)
//     if (event === 'event') {
//         // 在前面插入一个新的监听器。
//         myEmitter.on('event', () => {
//             console.log('B');
//         });
//     }
// });
// myEmitter.on('event', () => {
//     console.log('A');
// });
// myEmitter.emit('event');


// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {});
// myEmitter.on('event', () => {});
// console.log(EventEmitter.listenerCount(myEmitter, 'event'));


// EventEmitter.defaultMaxListeners // 默认最大事件监听个数


// emitter.setMaxListeners(emitter.getMaxListeners() + 1);
// emitter.once('event', () => {
//   // 做些操作
//   emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
// });



// const EventEmitter = require('events');
// const myEE = new EventEmitter();
// myEE.on('foo', () => {});
// myEE.on('bar', () => {});

// const sym = Symbol('symbol');
// myEE.on(sym, () => {});

// console.log(myEE.eventNames());
// prependListener 前置调用
// prependOnceListener 监听器先移除后调用



// const myEE = new EventEmitter()
// myEE.on('event', () => {
//     console.log('我后执行了')
// })
// myEE.prependListener('event', () => {
//     console.log('我会在前面执行哦')
// })
// myEE.emit('event')