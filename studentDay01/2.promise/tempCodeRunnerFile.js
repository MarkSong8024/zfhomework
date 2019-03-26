let Promise = require('./promise_shixian')
// let p = new Promise(function (resolve, reject) {
//     // setTimeout(function () {
//     //     resolve('成功')
//     // }, 1000)
//     // reject('失败')
//     // throw new Error('报错')
//     resolve('123')
// })
// p.then().then().then(null, err => {
//     console.log(err)
// })
// p.then().then().then(data => {
//     console.log(data)
// })
// let p2 = p.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // resolve('xxx')
//             resolve(new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve(10000)
//                 }, 1000)
//             }))
//         }, 1000)
//     })
// })
// p2.then(data => {
//     console.log(data)
// })

let p = new Promise((resolve, reject) => {
    reject(new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1000)
        }, 1000)
    }))
})
p.catch(err => {
    console.log(err)
}).then(data => {
    throw new Error('错误')
}).finally(() => { // 无论如何都执行
    console.log('100')
}).catch(data => {
    console.log(data)
})