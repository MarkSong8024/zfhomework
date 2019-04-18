let fs = require('fs')
let path = require('path')
// fs.mkdirSync('a/b')

// function mkdir(paths) {
//     let arr = paths.split('/')
//     for (let i = 0; i < arr.length; i++) {
//         let currentPath = arr.slice(0, i + 1).join('/')
//         try {
//             fs.accessSync(currentPath)
//         } catch (e) {
//             fs.mkdirSync(currentPath)
//         }
//     }
// }

// mkdir('a/b/c/d') // 默认创建目录 必须父级存在,才能创建子级


// function mkdirSync(paths, cb) {
//     let arr = paths.split('/')
//     function next(index) {
//         if (index >= arr.length) return cb()
//         let currentPath = arr.slice(0, index + 1).join('/')
//         fs.access(currentPath, (err) => {
//             if (err) {
//                 fs.mkdir(currentPath, () => next(index + 1))
//             } else {
//                 next(index + 1)
//             }
//         })
//     }
//     next(0)
// }
// mkdirSync('a/b/c/d/e/f/g/h', () => {
//     console.log('创建完成')
// })

// fs.rmdirSync('a')

// 先序,深度遍历, (同步)
// function removeDirSync(dir) {
//     let statObj = fs.statSync(dir)
//     if (statObj.isDirectory()) {
//         let dirs = fs.readdirSync(dir) // 拿到目录后,加上父级
//         for (let i = 0; i < dirs.length; i++) {
//             let current = path.join(dir, dirs[i])
//             removeDirSync(current) // 删除儿子节点.在将自己删掉
//         }
//         console.log(dir)
//         fs.rmdirSync(dir) // 把自己删掉
//     } else {
//         fs.unlinkSync(dir)
//     }
// }
// removeDirSync('a')

// 2.广度遍历 (同步)

// function wideSync(dir) {
//     let arr = [dir]
//     let index = 0
//     let current; // 读取的当前项
//     while (current = arr[index++]) {
//         let statObj = fs.statSync(current)
//         if (statObj.isDirectory()) {
//             let dirs = fs.readdirSync(current)
//             dirs = dirs.map(d => path.join(current, d)) // 当前儿子文件夹的路径
//             arr = [...arr, ...dirs] // [a, a/b, a/a.js]
//         } else {
//             // fs.unlinkSync(current)
//         }
//     }
//     for (let i = arr.length - 1; i >= 0; i--) {
//         let current = arr[i]
//         let statObj = fs.statSync(current)
//         if (statObj.isDirectory()) {
//             fs.rmdirSync(current)
//         } else {
//             fs.unlinkSync(current)
//         }
//     }
// }
// wideSync('a')

// 先序 深度 串行
// qa的源码 类似
// function rmdirSerires(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isDirectory()) {
//             // 读取文件中的内容
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(d => path.join(dir, d))
//                 function next(index) {
//                     if (index === dirs.length) return fs.rmdir(dir, cb)
//                     rmdirSerires(dirs[index], () => next(index + 1))
//                 }
//                 next(0)
//             })
//         } else {
//             fs.unlink(dir, cb)
//         }
//     })
// }
// rmdirSerires('a', () => {
//     console.log('删除成功')
// })


// 先序 并行删除 (异步)

function rmdirParallel(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            // 读取文件中的内容
            fs.readdir(dir, (err, dirs) => {
                if (dirs.length === 0) return fs.rmdir(dir, cb) // 如果目录里面没有东西,则删除
                dirs = dirs.map(d => {
                    let current = path.join(dir, d)
                    rmdirParallel(current, done)
                    return current
                })
                // 并行删除
                let index = 0
                function done() {
                    if (++index === dirs.length) {
                        fs.rmdir(dir, cb)
                    }
                }
            })
        } else {
            fs.unlink(dir, cb)
        }
    })
}
rmdirParallel('a', () => {
    console.log('删除成功')
})