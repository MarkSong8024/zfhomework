// 装饰器 decorator 可以修饰类,类的属性,类原型上的方法
@flag(123)
class Animal {
    @readonly
    PI = 3.14 
    static flag = '哺乳类'
    name = 'xxx'
    @before
    say() {
        console.log('说话')
    }
}
// 类添加静态属性
function flag(value) {
    return function(a) {
        a.type = value
    }
}
console.log(Animal.type)

// 实例上的属性
function readonly(targrt, property,decorator) { // 第一个类的原型.
    decorator.writable = false
    // console.log(targrt == Animal.prototype)
}
let anmial = new Animal()
// anmial.PI = 3.15

// 类原型上的方法
function before(targrt, property,decorator) {
    let oldSay = decorator.value
    decorator.value = function(){
        console.log('我先说话')
        oldSay.call(targrt, ...arguments)
    }
}
anmial.say()