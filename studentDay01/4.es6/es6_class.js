class Animal {
    static flag = '哺乳类' // 类上的静态属性 es7语法 
    // constructor () { // 实例
    //     this.name = 'xxx'
    // }
    name = 'xxx' // 实例上的属性.es7语法
    say() { // 原型上的方法 
        console.log('说话')
    }
}
Animal.prototype.a = 'hello' // 定义原型上的属性