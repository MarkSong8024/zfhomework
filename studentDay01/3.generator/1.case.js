// 生成器返回迭代器, 迭代器有next方法 调用next可以返回 value和done
// let obj = {
//     0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function () {
//         let self = this
//         let index = 0
//         return {
//             next() {
//                 return { value: self[index], done: index++ === self.length }
//             }
//         }
//     }
// }
let obj = {
    0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function * () {
        let index = 0
        while(index !== this.length) {
            yield this[index++]
        }
    }
}
function arg() {
    let arr = [...obj]
    console.log(arr)
    console.log(Array.isArray(arr))
}

arg([1, 2, 3, 4])


