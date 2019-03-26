let s1 = [1, 1, 2, 3, 4, 5, 5, 6, 6666]
let s2 = [1, 1, 2, 3, 4, 5, 5, 5, 7]
// let arr = new Set([...s1, ...s2])
// console.log(arr)
let n = new Set(s1)
// n.add(7)
// n.delete(1)
// console.log(n)
// console.log(n.has(9))
console.log(n.values())
console.log(n.entries())

let x = [...new Set(s1)].filter(item => {
    return new Set(s2).has(item)
})
let y = [...new Set(s1)].filter(item => {
    return !new Set(s2).has(item)
})
let z = [...new Set(s2)].filter(item => {
    return !new Set(s1).has(item)
})
console.log(x)
console.log(y)
console.log(z)


let m = new Map([[1, 2]])
let obj = { name: '111' }
m.set(obj, 333)
obj = null
// delete obj.name
console.log(m)

console.log(a)

// var function 全局作用域,函数作用域

let a = 1 // 没有变量名提升
{
    console.log(a)
    let a = 2
}

const PI = {name: '111'}
PI.name = '1234'
console.log(PI)
// 基本类型.string number boolean object symbol undefined

let x = () => ({x: 1})
console.log(x())


function* read() {
    let a = yield 1
    let b = yield 2
}
let it = read()
console.log(it.next())
console.log(it.next(100))
console.log(it.next(100))