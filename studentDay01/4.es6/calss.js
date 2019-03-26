// function Animal(name) {
//     this.name = name
//     this.arr = [1,2,3]
// }
// Animal.prototype.address = { location: 'home' }
// let a1 = new Animal('dog')
// let a2 = new Animal('cat')

// console.log(typeof a1)
// console.log(a1.arr === a2.arr)
// console.log(a1.address === a2.address)
// console.log(a1.__proto__ === Animal.prototype)
// console.log(a1.constructor === Animal)
// console.log(a1.__proto__.constructor === Animal)
// console.log(Animal.__proto__ === Function.prototype)
// console.log(a1.__proto__.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__)



function Animal(name) {
    this.name = name
    this.eat = '吃肉'
}
Animal.prototype.address = { location: 'home' }
function Tiger(name) {
    this.name = name
    this.age = 10
    Animal.call(this)  // 继承父类实例上的属性
}

// 1) 继承父类实例上的属性

let tiger = new Tiger()
console.log(tiger.eat)
// 2) 继承父类公共(原型)上的方法/属性
// Tiger.prototype.__proto__ = Animal.prototype 同下
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype)

Tiger.prototype = Object.create(Animal.prototype, { constructor: { value: Tiger } })
Tiger.prototype.say = function () {
    console.log('嗷~')
}
let tiger1 = new Tiger()
console.log(tiger1.constructor)
console.log(tiger1.address)