let EventEmitter = require('events')
// let util = require('util')
class MyEmitter extends EventEmitter { }
// // function MyEmitter() {}
// // util.inherits(MyEmitter, EventEmitter)
// const myEmitter = new MyEmitter()
// let m = 0
myEmitter.on('event', (a, b) => {
    // console.log('触发事件', a, b, this)
    console.log(++m)
    // setImmediate(() => {
    //     console.log('异步进行')
    // })
})
myEmitter.prependListener('event', () => {
    console.log('我会在前面执行哦')
})
// myEmitter.once('event', (a, b) => {
//     console.log(++m, a)
// })
myEmitter.emit('event', 'aaa', 'b')