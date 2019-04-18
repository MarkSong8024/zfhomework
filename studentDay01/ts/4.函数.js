// 函数
function sum1(a, b) {
    return a + b;
}
sum1(1, 2);
var getUserName = function (fName, lName) {
    return fName + lName;
};
// // 可选 参数 参数可有可无
// let items:number[] = [1, 2, 3]
// // let items: Array<number> = [1, 2, 3]
// type IteratorFunc = (item: number, index?: number, arr?: number[]) => void
// let iteratorFunc: IteratorFunc = function (item: number) {
//     console.log(item)
// }
// items.forEach(iteratorFunc)
// 默认参数
function ajax(url, method) {
    if (url === void 0) { url = "/user"; }
    console.log(url, method);
}
ajax();
// 剩余参数
function sum2(prefix) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var r = prefix + args.reduce(function (a, b) { return a + b; });
    return r;
}
console.log(sum2('$', 1, 2, 3, 4));
function getType(vale) {
    return 1;
}
