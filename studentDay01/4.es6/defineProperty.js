// let obj = {}
// let temp = ''
// Object.defineProperty(obj, 'name', {
//     enumerable: true,
//     configurable: true,
//     // writable: true,
//     // value: 'hello',
//     get() { // 读取方法
//         console.log('视图刷新了')
//         return temp
//     },
//     set(val) { // 设置方法
//         temp = val
//     }
// })
// // console.log(obj.name)
// // delete obj.name
// obj.name = 'word'
// console.log(obj.name)

// let obj = {
//     temp: '',
//     get name() {
//         return this.temp
//     },
//     set name(val) {
//         this.temp = val
//     }
// }
// obj.name = 'get/set'
// console.log(obj.name)


function update() {
    console.log('更新了')
}
let data = {
    name: 'zfpx',
    age: 10,
    address: {
        location: '回龙观'
    }
}
function observer(obj) {
    if (typeof obj !== 'object') return obj
    for (let key in obj) {
        defineReactive(obj, key, obj[key])
    }
}

function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(val) {
            if (value !== val) {
                observer(val)
                update()
                value = val
            }
        }
    })
}
observer(data)
data.address = [1, 2, 3]
// data.address[2] = 4

let mathods = ['push', 'shift', 'splice']
mathods.forEach(fn => {
    let oldFn = Array.prototype[fn]
    Array.prototype[fn] = function () {
        update()
        oldFn.call(this, ...arguments)
    }
})
data.address.push(5)


function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj
    if (hash.has(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor // obj 相当于是数组类或对象类的实例,类的constructor原型
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

let obj = {name: 123, address: { name: '回龙观' }}
obj.xxx = obj
let newObj = deepClone(obj)
console.log(newObj)







function deepClone(obj,hash=new WeakMap()){ // 判断obj是null还是undefined
    if(obj == null) return obj;
    // 不是对象就不用拷贝了
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    if(typeof obj !== 'object') return obj;
    // 要不是数组 要不是对象
    if(hash.has(obj)) return hash.get(obj); // 如果weakmap中有对象就直接返回
    let cloneObj = new obj.constructor;
    // 如果是对象把他放到weakMap中，如果在拷贝这个对象这个对象就存在了 直接返回这个对象即可
    hash.set(obj,cloneObj);
    for(let key in obj){ // 实现深拷贝
        if(obj.hasOwnProperty(key)){
            // 如果赋予的值是对象 我就把这个对象放到weakmap中
            cloneObj[key] = deepClone(obj[key],hash);
        }
    }
    return cloneObj
}
// map  weakMap  set 集合 map 映射表
let obj = {age:{name:123}}
obj.xxx = obj;
let n = deepClone(obj); 
console.log(n);