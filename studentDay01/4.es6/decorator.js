"use strict";

var _dec, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// 装饰器 decorator 可以修饰类,类的属性,类原型上的方法
var Animal = (_dec = flag(123), _dec(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function () {
  function Animal() {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "PI", _descriptor, this);

    this.name = 'xxx';
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('说话');
    }
  }]);

  return Animal;
}(), _class3.flag = '哺乳类', _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PI", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class2.prototype, "say"), _class2.prototype)), _class2)) || _class); // 类添加静态属性

function flag(value) {
  return function (a) {
    a.type = value;
  };
}

console.log(Animal.type); // 实例上的属性

function readonly(targrt, property, decorator) {
  // 第一个类的原型.
  decorator.writable = false; // console.log(targrt == Animal.prototype)
}

var anmial = new Animal(); // anmial.PI = 3.15
// 类原型上的方法

function before(targrt, property, decorator) {
  var oldSay = decorator.value;

  decorator.value = function () {
    console.log('我先说话');
    oldSay.call.apply(oldSay, [targrt].concat(Array.prototype.slice.call(arguments)));
  };
}

anmial.say();
