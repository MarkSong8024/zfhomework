// 类型推断
var name2;
name2 = 10;
// 包装类
// 基本数据类型是没有方法的
var name3 = 10;
name3.toFixed(3);
// 当你在一个基本数据类型上.会隐含着把一个基本类型包装成对象
// 联合类型
var name4;
name4 = 'lss';
name4 = 100;
name4 = true;
// 类型断言
// (name4 as string).length
// let r:any = document.getElementById('app')
// (r as number).toFixed(2)
