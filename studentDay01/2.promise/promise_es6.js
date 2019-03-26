


let resolvePromise = (promise2, x, resolve, reject) => {
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
                    resolvePromise(promise2, x, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
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
class Promise {
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    static all(values) {
        return new Promise((resolve, reject) => {
            let arr = []
            let count = 0
            let processData = (key, value) => {
                arr[key] = value
                count++
                if (count === values.length) {
                    resolve(arr)
                }
            }
            for (let i = 0, current; i < values.length; i++) {
                current = values[i]
                let then = current.then
                if (then && typeof then === 'function') {
                    then.call(current, y => {
                        processData(i, y)
                    })
                } else {
                    processData(i, current)
                }
            }
        })
    }
    static race(values) {
        return new Promise((resolve, reject) => {
            for (let i = 0, current; i < values.length; i++) {
                current = values[i]
                let then = current.then
                if (then && typeof then === 'function') {
                    then.call(current, y => {
                        resove(y)
                    })
                } else {
                    resolve(current)
                }
            }
        })
    }
    constructor(executer) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolveCallBacks = []
        this.onRejectedCallBacks = []
        let resolve = (value) => {
            this.value = value
            this.status = 'fulfilled'
            this.onResolveCallBacks.forEach(fn => fn())
        }
        let reject = (reason) => {
            this.reason = reason
            this.status = 'rejected'
            this.onRejectedCallBacks.forEach(fn => fn())
        }
        try {
            executer(resolve, reject)
        }
        catch (e) {
            reject(e)
        }
    }
    then(onfulfilled, onrejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

            }
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === 'pending') {
                this.onResolveCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
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
    catch(errCallBack) {
        return this.then(null, errCallBack)
    }
    finally(callback) {
        return this.then(val => Promise.resolve(callback()).then(() => val),
            reason => Promise.resolve(callback()).then(() => { throw reason }))
    }
}
Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise