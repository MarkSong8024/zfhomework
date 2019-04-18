#! /usr/bin/env node
let config = {
    port: 3000,
    host: '127.0.0.1',
    dir: process.cwd()
}
let program = require('commander')
let json = require('../package.json')
program.version(json.version)
    .option('-p --port <n>', '设置端口')
    .option('-o --host <n>', '设置域名')
    .option('-d --dir <n>', '设置启动位置')
    .parse(process.argv)
config = { ...config, ...program }
let Server = require('../server')
let server = new Server(config)
server.start()