let http = require('http') // http内置模块
let queryString = require('querystring')
let serevr = http.createServer()
serevr.on('request', (req, res) => {
    console.log('请求来了')
    console.log(req.method) // GET / Post
    console.log(req.url) // GET / Post
    console.log(req.httpVersion); // 请求版本
    // console.log(req.headers) // 请求头部主体
    let arr = []
    req.on('data', (chunk) => {
        arr.push(chunk)
    })
    req.on('end', () => {
        console.log(arr)
        let str = Buffer.concat(arr).toString()
        let obj = {}
        console.log(req.headers)
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            obj = querystring.parse(str);
        }
        res.statusCode = 200
        res.sendData = false
        res.end('相应数据:' + JSON.stringify(obj))
    })
})

serevr.listen('3000', () => {
    console.log('server start success')
})
