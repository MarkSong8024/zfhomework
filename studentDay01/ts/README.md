##  如何使用Ts
```
1. 安装全局ts npm install typescript -g
   cmd: tsc path.ts
2. tsc --init 安装tsconfig.json配置
   cmd: tsc
3. package.json script 模块 
    "scripts": {
    "build": "tsc",
    "start": "tsc --watch"
  }
  cmd: npm start
```
## TS中的基本数据类型
- string
- number
- boolean
- undefined
- null
- symbol

- undefined和null是其他基本类型的子类型