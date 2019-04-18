/**
 * 定义一个类
 * get set 存储器
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
// public相当于给当前类的实例,添加了一个公有属性
var Person2 = /** @class */ (function () {
    function Person2(myname) {
        this.myname = myname;
        console.log(myname);
    }
    return Person2;
}());
// 只读 readonly
var Person3 = /** @class */ (function () {
    function Person3(id) {
        this.id = id;
    }
    return Person3;
}());
var p3 = new Person3(1);
console.log(p3.id);
// p3.id = 11
var Parent = /** @class */ (function () {
    function Parent(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    return Parent;
}());
var child = /** @class */ (function (_super) {
    __extends(child, _super);
    function child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return child;
}(Parent));
