// console.log(this)
// console.log(Object.keys(global))
// process 进程.当前执行的环境
// Buffer 可以读写文件 内存中 Buffer
// setImmediate
// setTimeout
// 默认把v8引擎上的方法,给隐藏了

// console.dir(global)
// argv 运行时传递的参数
//  
// env 环境变量 设置值 window set NODE_ENV = development 
// mac export NODE_ENV = development
console.log(process.env.NODE_ENV)
console.log(process.cwd())

