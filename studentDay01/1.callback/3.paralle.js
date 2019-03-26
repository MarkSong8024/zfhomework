// paralle 并发

let newFn = after(2, function(obj){
    console.log(obj)
});
function after(times, callback){
    let obj = {}
    return function(key, val){
        obj[key] = val
        if(--times===0){
            callback(obj)
        }
    }
}
let fs = require('fs')
fs.readFile('./a.txt', 'utf-8', function(err, data) {
    if (err) return console.log(err)
    newFn('name', data)
})
fs.readFile('./b.txt', 'utf-8', function(err, data) {
    if (err) return console.log(err)
    newFn('age', data)
})