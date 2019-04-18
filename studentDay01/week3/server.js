let http = require('http');
// let fs = require('mz/fs');
let fs = require('fs');
let path = require('path');
let url = require('url');
let zlib = require('zlib')

let chalk = require('chalk');
let mime = require('mime');
let ejs = require('ejs');

// 获取模板
let template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');
class Server {
    constructor(config) {
        this.port = config.port;
        this.dir = config.dir;
        this.host = config.host;
        this.template = template;
    }
    // 处理流程
    async handleRequest(req, res) {
        try {
            let { pathname } = url.parse(req.url); // xxx/xxx/xxx.js
            console.log('====', this.dir, pathname, '====')
            let absPath = path.join(this.dir, decodeURIComponent(pathname));
            let statObj = await fs.statSync(absPath);
            if (statObj.isDirectory()) { // 目录,则展示目录
                let dirs = await fs.readdirSync(absPath)
                let str = ejs.render(this.template, {
                    arrs: dirs.map(dir => {
                        let absPathName = path.resolve(absPath, dir)
                        return {
                            isDirectory: fs.statSync(absPathName).isDirectory(),
                            href: path.join(pathname, dir),
                            content: dir
                        }
                    })
                })
                res.setHeader('Content-Type', 'text/html;charset=utf8')
                res.end(str)
            } else { // 其他类型直接输出
                this.sendFile(req, res, absPath, statObj)
            }
        } catch (e) {
            console.log(e)
            this.sendError(req, res);
        }
    }
    // 输入内容
    sendFile(req, res, absPath, statObj) {
        if (req.headers['encoding']) { // 请求gzip压缩
            this.setEncoding(req, res, absPath)
        } else {
            let range = req.headers['range'];
            if (range) { // 范围请求206 
                let total = fs.statSync(absPath).size; // 获取总文件大小
                let [, start, end] = range.match(/(\d*)-(\d*)/); // range:bytes=1-5
                start = start ? Number(start) : 0
                end = end ? end : total;
                res.statusCode = 206;
                res.setHeader('Content-Type', `bytes ${start}-${end}/${total}`);
                fs.createReadStream(absPath, { start, end: end - 1 }).pipe(res); // 返回相应的范围内容
            } else if (this.isCache(req, res, absPath, statObj)) { // 缓存
                res.statusCode = 304;
                res.end();
            } else { // 正常请求
                res.statusCode = 200;
                res.setHeader('Content-Type', mime.getType(absPath) + ';charset=utf8');
                fs.createReadStream(absPath).pipe(res);
            }
        }
    }
    setEncoding(req, res, absPath) { // gizp压缩
        let encoding = req.headers['accept-encoding'];
        if (encoding) { // gzip压缩
            // Accept-Encoding:gizp, deflate
            if (/\bgzip\b/.test(encoding)) {
                res.setHeader('Content-Encoding', 'gzip');
                fs.createReadStream(absPath).pipe(zlib.createGzip()).pipe(res);
                return;
            }
            if (/\bdeflate\b/.test(encoding)) {
                res.setHeader('Content-Encoding', 'deflate');
                fs.createReadStream(absPath).pipe(zlib.createDeflate()).pipe(res);
                return;
            }
            fs.createReadStream(absPath).pipe(res);
        }
        fs.createReadStream(absPath).pipe(res);
    }
    // 找不打文件.相应错误
    sendError(req, res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plan;charset=utf8');
        res.end('没得找到');
    }
    // 是否被缓存
    isCache(req, res, absPath, statObj) {
        let modifiedSince = req.headers['if-modified-since']; // 获取缓存
        let noneMatch = req.headers['if-none-match']; // 获取对比缓存
        let lastModified = statObj.ctime.toUTCString();
        let etag = statObj.size + '';
        res.setHeader('Cache-Control', 'max-age=5'); // 设置强制缓存
        res.setHeader('Last-Modified', lastModified); // 设置对比缓存1(修改时间对比缓存)
        res.setHeader('Etag', etag); // 设置对比缓存2(内容大小变换,对比缓存)
        if (lastModified !== modifiedSince) return false;
        if (noneMatch !== etag) return false;
        return true;
    }
    // 启动服务
    start() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.host, () => {
            console.log(chalk.yellow(`服务${this.port}已开启,当前目录${this.dir}`));
            console.log(chalk.green(`点击访问  http://${this.host}:${this.port}`));
        })
    }
}
module.exports = Server;