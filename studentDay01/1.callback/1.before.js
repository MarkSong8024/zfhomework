
Function.prototype.before = function(callback) {
    let self = this
    return function() {
        callback()
        self.apply(self, arguments)
    }
}

function fn(val) {
    console.log(`我是后来执行的.${val}`)
}
let newFn = fn.before(function(){
    console.log('在函数执行之前执行')
})
newFn('哈哈哈')
