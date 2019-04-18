// let buffer = Buffer.from('珠峰')
// console.log(Buffer.isBuffer(buffer))

// concat, copy

let buffer1 = Buffer.from('珠峰')
let buffer2 = Buffer.from('架构')
// let bigBuffer = Buffer.alloc(12)
// copy方法
// Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
//     for (let i = 0; i < sourceEnd - sourceStart; i++) {
//         target[targetStart + i] = this[sourceStart + i]
//     }
// }
// // 目标buffer 目标的拷贝位置 源的开始和源的结束
// buffer1.copy(bigBuffer, 0, 0, 6) // 字节
// buffer2.copy(bigBuffer, 6) // 字节
// console.log(bigBuffer.toString())

// concat 合并
Buffer.concat = function (list, totalLength = list.reduce((a, b) => (b.length + a), 0)) {
    let buffer = Buffer.alloc(totalLength)
    let offset = 0
    list.forEach(buff => {
        buff.copy(buffer, offset)
        offset += buff.length
    })
    return buffer
}
console.log(Buffer.concat([buffer1, buffer2]).toString())


let fs = require('fs')
let path = require('path')
fs.readFile(path.resolve(__dirname, './1.txt'), (err, data) => {
    console.log(data.toString('ASCII'))
})

let obj = {name:'lss'}
console.log({...obj.name})