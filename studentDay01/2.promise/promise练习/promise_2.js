function Promise(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    let self = this
    self.onResolveCallBacks = []
    self.onRejectedCallBacks = []
    function resolve(value) {
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
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('循环引用'))
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
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
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
    let self = this
    let promise2 = new Promise((resolve, reject) => {
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
        if (self.status === 'pending') {
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
// Promise.all = function (values) {
//     return new Promise((resolve, reject) => {
//         let arr = []
//         let count = 0
//         function processData(key, value) {
//             arr[key] = value
//             count++
//             if (arr.length === values.length) {
//                 resolve(arr)
//             }
//         }
//         for (let i = 0; i < values.length; i++) {
//             let current = values[i]
//             let then = current.then
//             if (then && typeof then === 'function') {
//                 then.call(current, y => {
//                     processData(i, y)
//                 }, reject)
//             } else {
//                 processData(i, current)
//             }
//         }
//     })
// }

Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise;