// 函数
function sum1(a: number, b: number): number {
    return a + b
}
sum1(1, 2)

// 函数表达式
// type用于定义类型别名
type GetUserName = (x: string, y: string) => string;
let getUserName: GetUserName = function (fName: string, lName: string) {
    return fName + lName
}

// // 可选 参数 参数可有可无
// let items:number[] = [1, 2, 3]
// // let items: Array<number> = [1, 2, 3]
// type IteratorFunc = (item: number, index?: number, arr?: number[]) => void
// let iteratorFunc: IteratorFunc = function (item: number) {
//     console.log(item)
// }
// items.forEach(iteratorFunc)


// 默认参数
function ajax(url: string = "/user", method?: string) {
    console.log(url, method)
}
ajax()


// 剩余参数
function sum2(prefix, ...args: number[]) {
    let r = prefix + args.reduce((a, b) => a + b)
    return r
}
console.log(sum2('$', 1, 2, 3, 4))


// 函数的重载
// 类型的别名
type myType = string | number | boolean
function getType(vale: myType):myType {
    return 1
}