let fs = require('fs')
let path = require('path')
// fd file descriptor 文件描述符,number类型
let buffer = Buffer.alloc(3)
fs.open(path.resolve(__dirname, './age.txt'), 'r', 438, (err, fd) => {
    fs.read(fd, buffer, 0, 3, 9, (err, bytesRead) => {
        console.log(bytesRead.toString())
    })
})


// let buffer = Buffer.from('刘松松')
// fs.open(path.resolve(__dirname,'name.txt'), 'w+',(err, fd)=> {
//     fs.write(fd,buffer,3,3,0,(err, written) => {
//         console.log('写入成功')
//     })
// })

// 拷贝
function copy(source, target) {
    let buffer = Buffer.alloc(3)
    let pos = 0
    fs.open(source, 'r', (err, rfd) => {
        fs.open(target, 'w', (err, wfd) => {
            function next() {
                fs.read(rfd, buffer, 0, 3, pos, (err, bytesRed) => {
                    if (bytesRed > 0) {
                        pos += bytesRed
                        fs.write(wfd, buffer, 0, bytesRed, (err, written) => {
                            next()
                        })
                    } else {
                        fs.close(rfd,()=>{})
                        fs.close(wfd,()=>{})
                    }
                })
            }
            next()
        })
    })
}
copy(path.resolve(__dirname, 'age.txt'), path.resolve(__dirname, 'name.txt'))