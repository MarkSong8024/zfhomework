"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Animal =
/*#__PURE__*/
function () {
  function Animal() {
    _classCallCheck(this, Animal);

    _defineProperty(this, "name", 'xxx');
  }

  _createClass(Animal, [{
    key: "say",
    // 实例上的属性.es7语法
    value: function say() {
      // 原型上的方法 
      console.log('说话');
    }
  }]);

  return Animal;
}();

_defineProperty(Animal, "flag", '哺乳类');
