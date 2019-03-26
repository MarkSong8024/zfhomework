
// let Promise = require('./promise_shixian')
// // let p = new Promise(function (resolve, reject) {
// //     // setTimeout(function () {
// //     //     resolve('成功')
// //     // }, 1000)
// //     // reject('失败')
// //     // throw new Error('报错')
// //     resolve('123')
// // })
// // p.then().then().then(null, err => {
// //     console.log(err)
// // })
// // p.then().then().then(data => {
// //     console.log(data)
// // })
// // let p2 = p.then((data) => {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //             // resolve('xxx')
// //             resolve(new Promise((resolve, reject) => {
// //                 setTimeout(() => {
// //                     resolve(10000)
// //                 }, 1000)
// //             }))
// //         }, 1000)
// //     })
// // })
// // p2.then(data => {
// //     console.log(data)
// // })

// let p = new Promise((resolve, reject) => {
//     reject(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(1000)
//         }, 1000)
//     }))
// })
// p.catch(err => {
//     console.log(err)
// }).then(data => {
//     throw new Error('错误')
// }).finally(() => { // 无论如何都执行
//     console.log('100')
// }).catch(data => {
//     console.log(data)
// })

// p.then(r => console.log(r))
// // p.then(null, err => {
// //     console.log(err)
// // }).catch(err => {
// //     console.log(err)
// // }).then(data => {
// //     console.log(data)
// // }).finally(() => {
// //     console.log('100')
// // })



// Promise.resolve(123).then(data => {
//     console.log(data, '===')
// })
// Promise.reject(456).catch(data => {
//     console.log(data, '===')
// })

// function promisify(fn) {
//     return function () {
//         new Promise((resolve, reject) => {
//             fn(...arguments, function (err, data) {
//                 if (err) reject(err)
//                 resolve(data)
//             })
//         })
//     }
// }

// function promisifyAll(obj) {
//     for (let key in obj) {
//         if (typeof obj[key] === 'function') {
//             obj[key + 'Async'] = promisify(obj[key])
//         }
//     }
// }

// import Promise  from './promise_es6'
let Promise = require('./promise_es6')
let p = new Promise((resolve, reject) => {
    // resolve('1')
    setTimeout(() => {
        reject(1)
    }, 1000)
})
p.then(data => {
    console.log(data)
}, err => {
    console.log(err)
}).then(data => {
    console.log(data)
})