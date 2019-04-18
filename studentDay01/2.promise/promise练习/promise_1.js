console.log('我第一周练习promise')
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
                    reject(r)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        }
        catch (e) {
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
    // 返回一个新的promise.可以继续then链式调用
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
        if (self.status === 'pending') {
            self.onResolveCallBacks.push(
                function () {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(self.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            self.onRejectedCallBacks.push(
                function () {
                    setTimeout(() => {
                        try {
                            let x = onrejected(self.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                }
            )
        }
    })
    return promise2
}
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = []
        let count = 0
        function processData(key, value) {
            arr[key] = value
            count++
            if (count === values.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i]
            let then = current.then
            if (then && typeof then === 'function') {
                then.call(current, y => {
                    processData(i, y)
                }, reject)
            } else {
                processData(i, current)
            }
        }
    })
}
Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i]
            let then = current.then
            if (then && typeof then === 'function') {
                then.call(current, y => {
                    resolve(y)
                }, reject)
            } else {
                resolve(current)
            }
        }
    })
}
Promise.prototype.catch = function (errCallBack) {
    return this.then(null, errCallBack)
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

// promises-aplus-tests 
// 该版本监测通过
Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise