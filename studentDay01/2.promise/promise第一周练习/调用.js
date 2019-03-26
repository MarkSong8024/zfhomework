let Promise = require('./promise_1')

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 1000)
    // reject('失败')
    // throw new Error('错误了')
})
let p2 = p.then((val) => {
    return val
}, (reason) => {
    console.log(reason)
})
p2.then(value => {
    console.log(val)
})