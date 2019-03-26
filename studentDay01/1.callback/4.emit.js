// 发布订阅
let fs = require('fs')
function Event() {
    this._arr = []
}
Event.prototype.on = function (callback) {
    this._arr.push(callback)
    console.log('fn', this._arr.length)
}
Event.prototype.emit = function () {
    this._arr.forEach(fn => fn.apply(this, arguments))
}
let e = new Event()

let school = {}
e.on(function (key, data) {
    school[key] = data
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
})

fs.readFile('./a.txt', 'utf-8', function (err, data) {
    if (err) return console.log(err)
    e.emit('name', data)
})
fs.readFile('./b.txt', 'utf-8', function (err, data) {
    if (err) return console.log(err)
    e.emit('age', data)
})