/**
 * 定义一个类
 * get set 存储器
 */

class Person {
    name: string
    getName(): void {
        console.log(this.name)
    }
}

// public相当于给当前类的实例,添加了一个公有属性
class Person2 {
    constructor(public myname: string) {
        console.log(myname)
    }
}

// 只读 readonly
class Person3 {
    readonly id: number
    constructor(id: number) {
        this.id = id
    }
}
let p3 = new Person3(1)
console.log(p3.id)
// p3.id = 11


class Parent {
    public name: string; // 公开的.都能访问
    protected age: number; // 受保护的,自己 自己子类可以访问
    private money: number; // 私有的. 只能自己访问
    constructor(name: string, age: number, money: number) {
        this.name = name
        this.age = age
        this.money = money
    }
}

class child extends Parent {
    
}