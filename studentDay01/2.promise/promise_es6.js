
class Promise {
    // static resolve(value) {
    //     return new Promise((resolve, reject) => {
    //         resolve(value)
    //     })
    // }
    // static reject(reason) {
    //     return new Promise((resolve, reject) => {
    //         reject(reason)
    //     })
    // }
    // static all(values) {
    //     return new Promise((resolve, reject) => {
    //         let arr = []
    //         let count = 0
    //         let processData = (key, value) => {
    //             arr[key] = value
    //             count++
    //             if (count === values.length) {
    //                 resolve(arr)
    //             }
    //         }
    //         for (let i = 0, current; i < values.length; i++) {
    //             current = values[i]
    //             let then = current.then
    //             if (then && typeof then === 'function') {
    //                 then.call(current, y => {
    //                     processData(i, y)
    //                 })
    //             } else {
    //                 processData(i, current)
    //             }
    //         }
    //     })
    // }
    // static race(values) {
    //     return new Promise((resolve, reject) => {
    //         for (let i = 0, current; i < values.length; i++) {
    //             current = values[i]
    //             let then = current.then
    //             if (then && typeof then === 'function') {
    //                 then.call(current, y => {
    //                     resove(y)
    //                 })
    //             } else {
    //                 resolve(current)
    //             }
    //         }
    //     })
    // }
    constructor(executer) {
        this.onResolveCallBacks = []
        this.onRejectedCallBacks = []
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        let resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === 'pending') {
                this.value = value
                this.onResolveCallBacks.forEach(fn => fn())
                this.status = 'fulfilled'
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.reason = reason
                this.onRejectedCallBacks.forEach(fn => fn())
                this.status = 'rejected'
            }
        }
        try {
            executer(resolve, reject)
        }
        catch (e) {
            reject(e)
        }
    }
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
        onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
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
let resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError('循环引用'))
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called;
        try {
            const then = x.then
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
Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise