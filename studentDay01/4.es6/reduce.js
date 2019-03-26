// reduce 收敛函数
let r = [1, 2, 3, 4, 5].reduce((a, b, index, current) => {
    console.log(a, b, index, current)
    return a + b
}, 6)
console.log(r)

// let r = [{ price: 100 }, { price: 100 }, { price: 100 }, { price: 100 }].reduce((a, b) => {
//     return a + b.price
// }, 0)
// console.log(r)


// reduce常见功能

let keys = ['name', 'age']
let values = ['lss', 18] // {name: 'lss', age: 18}
// let obj = keys.reduce((a, b, index) => {
//     a[b] = values[index]
//     return a
// }, {})

let obj = keys.reduce((a, b, index) => (a[b] = values[index], a), {})

console.log(obj)

// redux compose 方法