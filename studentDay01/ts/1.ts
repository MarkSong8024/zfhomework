// 1.基本数据类型
let name1: string = '珠峰2' // 两个文件名的名称不能一样
let age: number = 10
let isLive: boolean = true
let x: undefined = undefined
let y: null = null
name1 = null
name1 = undefined

// 2.数组
let names1: string[] = ['a', 'b', 'c']
let names2: Array<string> = ['a', 'b', 'c'] // 泛型

// 3.元组 长度和类型都确定的数组
let person: [string, number, string] = ['lss', 18, 'china']
console.log(person[0].length)
console.log(person[1].toFixed(2))
console.log(person[2].length)

// 4.枚举
enum Gender {
    GIRL,
    BOY
}
let boy: number = Gender.BOY

// 5.常数枚举
const enum Colors {
    RED,
    YELLOW,
    BULE,
}
let colors = [Colors.RED, Colors.YELLOW, Colors.BULE]

// 6.any任意类型
let x2: any;
x2 = 'lss'
x2 = 100


// 7.never永远不 其他类型(null undefined)的子类型 代表不会出现的值
// 作为没有返回值的函数的返回值类型
function getY(): never {
    console.log(1)
    throw new Error('报错了')
    console.log(2)
}

function sum(): number {
    while (true) { }
    console.log(3)
}
// 表示没有返回值 void
function getName(): void {
    console.log('hello')
    // return 1  不能返回
}

// void 和 never的区别
// void可以被赋为null和undefined类型,never则是一个不包含值的类型
// 拥有void返回类型的函数能正常运行.never的函数无法返回,无法终止.则会抛出异常..