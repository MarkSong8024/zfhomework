// 1.基本数据类型
var name1 = '珠峰2'; // 两个文件名的名称不能一样
var age = 10;
var isLive = true;
var x = undefined;
var y = null;
name1 = null;
name1 = undefined;
// 2.数组
var names1 = ['a', 'b', 'c'];
var names2 = ['a', 'b', 'c']; // 泛型
// 3.元组 长度和类型都确定的数组
var person = ['lss', 18, 'china'];
console.log(person[0].length);
console.log(person[1].toFixed(2));
console.log(person[2].length);
// 4.枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
var boy = Gender.BOY;
var colors = [0 /* RED */, 1 /* YELLOW */, 2 /* BULE */];
// 6.any任意类型
var x2;
x2 = 'lss';
x2 = 100;
// 7.never永远不 其他类型(null undefined)的子类型 代表不会出现的值
// 作为没有返回值的函数的返回值类型
function getY() {
    console.log(1);
    throw new Error('报错了');
    console.log(2);
}
function sum() {
    while (true) { }
    console.log(3);
}
// 表示没有返回值 void
function getName() {
    console.log('hello');
    // return 1  不能返回
}
// void 和 never的区别
// void可以被赋为null和undefined类型,never则是一个不包含值的类型
// 拥有void返回类型的函数能正常运行.never的函数无法返回,无法终止.则会抛出异常..
