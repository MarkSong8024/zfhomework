// fs中的方法.分为同步和异步

let fs = require('fs')
let path = require('path')
// let r = fs.readFileSync(path.resolve(__dirname,'./name.txt'))
// console.log(r)
// fs.writeFileSync(path.resolve(__dirname, './name.txt'), Buffer.from('刘松松'))


function copy(source, target) {
    fs.readFile(source, (err, data) => {
        if(err) return console.log(err)
        fs.writeFile(target,data, (err) => {
            if(err) return console.log(err)
            console.log('写入成功')
        })
    })
}
copy(path.resolve(__dirname,'./name.txt'), path.resolve(__dirname,'./age.txt'))