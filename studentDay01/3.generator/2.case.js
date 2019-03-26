// function* read() {
//     let a = yield 1
//     console.log(a, 'aaaa')
//     let b = yield 2
//     console.log(b, 'bbbb')
//     let c = yield 3
//     console.log(c)
// }
// //生成器返回的是迭代器,调用next可以返回value和done
// let it = read()
// console.log(it.next()) // 第一次next不能传递值的
// console.log(it.next(100))
// console.log(it.next(200))
// console.log(it.next(300))

let fs = require('mz/fs')
function* read() {
    let r = yield fs.readFile('./a.txt', 'utf8')
    let age = yield fs.readFile(r, 'utf8')
    return age
}
function co(it) {
    return new Promise((resolve, reject) => {
        function next(val) {
            let { value, done } = it.next(val)
            if (done) {
                return resolve(value)
            }
            // 如果不是promise,把它包装成promise
            Promise.resolve(value).then(data=>{
                next(data)
            }, reject)
        }
        next()
    })
}
co(read()).then(data => {
    console.log(data)
})
// let co = require('co')
// co(read()).then(data => {
//     console.log(data)
// })
// let it = read()
// let {value, done} = it.next()
// value.then(data => {
//     let {value, done} = it.next(data)
//     value.then(data => {
//         let{value, done } = it.next(data)
//         console.log(value)
//     })
// })


function* read () {
    let a = yield 1
    console.log(a)
    let b = yield 2
    console.log(b)
}
const it = read()
console.log(it.next())
console.log(it.next(100))