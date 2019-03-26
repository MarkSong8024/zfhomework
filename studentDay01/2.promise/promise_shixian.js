console.log('my!')
function Promise(executor) {
    // 给promise定义状态
    this.status = 'pending'
    // 成功.失败的原因
    this.value = undefined
    this.reason = undefined
    let self = this
    // 定义两个队列.存放成功.失败回调.发布订阅
    self.onResolveCallBacks = []
    self.onRejectedCallBacks = []
    function reslove(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        if (self.status === 'pending') {
            self.value = value
            self.status = 'fulfilled'
            self.onResolveCallBacks.forEach(fn => fn())
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
            self.onRejectedCallBacks.forEach(fn => fn())
        }
    }
    // 执行器会立刻执行
    try {
        executor(reslove, reject)
    } catch (e) { // 如果报错.调用reject方法
        reject(e)
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }
    if (typeof x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
    // 值的穿透
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
    let self = this
    let promise2 = new Promise(function (resolve, reject) {
        if (self.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onfulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onrejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'pending') { // 异步.发布订阅
            self.onResolveCallBacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
            self.onRejectedCallBacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onrejected(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }
    })
    return promise2
}
Promise.prototype.catch = function (errCallBack) {
    return this.then(null, errCallBack)
}


Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

Promise.prototype.finally = function (callback) { // finally 是then的别名
    return this.then(function (value) { // 成功
        return Promise.resolve(callback()).then(() => {
            return value
        })
    }, function (reason) { // 失败
        return Promise.resolve(callback()).then(() => {
            throw reason
        })
    })
}

// Promise.all = function (values) {
//     return new Promise((resolve, reject) => {
//         let arr = []
//         let count = 0
//         function processData(key, value) {
//             count++
//             arr[key] = value
//             if (count === values.length) {
//                 resolve(arr)
//             }
//         }
//         for (let i = 0; i < values.length; i++) {
//             let current = values[i]
//             let then = current.then
//             if (then && typeof (then) === 'function') {
//                 then.call(current, y => {
//                     processData(i, y)
//                 }, reject)
//             } else {
//                 processData(i, current)
//             }
//         }
//     })
// }

// Promise.race = function (values) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < values.length; i++) {
//             let current = values[i]
//             let then = current.then
//             if (then && typeof (then) === 'function') {
//                 then.call(current, y => {
//                     resolve(y)
//                 }, reject)
//             } else {
//                 resolve(current)
//             }
//         }
//     })
// }


// 测试promise是否符合A+规范
// npm install promises-aplus-tests -g
// 使用 promises-aplus-tests promise.js
Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise
