function sum(a, b) {
    return a + b
}
function toUpper(str) {
    return str.toUpperCase()
}
function add(str) {
    return `***${str}***`
}


// fn(1,2,3,4,5)
// function fn (...a) {
//     console.log(...a)
// }
// console.log(add(toUpper(sum('lss', 'xixi'))))


// function compose(...fns) {
//     return function (...args) {
//         let lastFn = fns.pop()
//         return fns.reduceRight((a, b) => {
//             return b(a)
//         }, lastFn(...args))
//     }
// }

// let compose = (...fns) => (...args) => {
//     let lastFn = fns.pop()
//     return fns.reduceRight((a, b) => b(a), lastFn(...args))
// }

// function compose(...fns) {
//     return fns.reduce((a, b) => { // 此时返还的函数是reduce方法返回的
//         return (...args) => { // toUpper(sum('lss', 'hello'))
//             return a(b(...args))
//         }
//     })
// }

let compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))

let r = compose(add, toUpper, sum)('lss', 'hello')
console.log(r)


Array.prototype.reduce = function (callback, prev) {
    for (let i = 0, current; i < this.length; i++) {
        current = this[i]
        if (prev == undefined) {
            prev = callback(this[i], this[i + 1], i + 1, this)
            i++
        } else {
            prev = callback(prev, this[i], i, this)
        }
    }
    return prev
};

let r = [1, 2, 3].reduce((a, b, index, current) => {
    return a + b
})

console.log(r)