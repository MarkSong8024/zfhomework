
let path = require('path')
let fs = require('fs')
let vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}

Module.wrapper = ['(function(exports, module, require, __dirname, __filenam){', '})']
Module._extensions = {
    '.js'(module) {
        let str = fs.readFileSync(module.id)
        let scriptStr = Module.wrapper[0] + str + Module.wrapper[1]
        let fn = vm.runInThisContext(scriptStr)
        // 把函数执行,将exports属性传递给1.js
        // exports 是module.exports的别名
        fn.call(module.exports, module.exports, module, req)
    },
    '.json'(module) {
        let str = fs.readFileSync(module.id, 'utf8')
        str = JSON.parse(str)
        module.exports = str
    }
}
Module.prototype.load = function () {
    let extname = path.extname(this.id)
    Module._extensions[extname](this)

}
Module._cache = {}

function req(id) {
    let absPath = path.resolve(__dirname, id)
    let newAbsPath = '' // 声明一个新的值
    let index = 0
    let extNameList = ['.js','.json']
    function findFileExistAndAddSuffix(absPath) { // 检查文件是否存在,不存在尝试加载后缀,最后抛出异常
        if (index === extNameList.length) {
            throw new Error('文件不存在')
            return
        }
        try {
            fs.accessSync(absPath)
            newAbsPath = absPath // 新的值赋值
            return
        } catch (e) {
            let newAbsPath = absPath + extNameList[index++] // 不存在.尝试加载后缀
            findFileExistAndAddSuffix(newAbsPath)
        }
    }
    findFileExistAndAddSuffix(absPath)
    if (Module._cache[newAbsPath]) { //  如果已经存在,返回缓存值
        return Module._cache[newAbsPath].exports
    }
    let module = new Module(newAbsPath)
    Module._cache[newAbsPath] = module // 缓存当前exports对象
    module.load()
    return module.exports
}

// let r = req('sum.json')
let r = req('./1')
r = req('./1')
r = req('./1')
console.log(r)