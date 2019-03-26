let fs = require('mz/fs')
async function read() {
    // try {
    //     let r = await fs.readFile('./a.txt', 'utf8')
    //     let age = await fs.readFile(r, 'utf8')
    //     return age
    // }
    // catch (e) {
    //     console.log(e)
    // }
    let r = await fs.readFile('./a.txt', 'utf8')
    let age = await fs.readFile(r, 'utf8')
    return age
}
read().then(data => {
    console.log(data)
})