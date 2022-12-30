const path = require('path')
require('./utils/alias')(path.join(__dirname, '..'), {
  src: path.join(__dirname, '.')
})
const Koa = require('koa')
const cors = require('koa2-cors')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const mapRoutes = require('@src/routes')
const $consts = require('@src/plugins/consts')
const { errorHandler } = require('@src/utils/error')
const { generateModel } = require('@src/db')

const app = new Koa()

// 注册插件
app.use(cors({ origin: '*' }))
app.use(koaBody())
app.use(koaStatic(path.join(__dirname, 'static')))

// 注册路由
mapRoutes(app)

// 初始化 models
generateModel()

// 异常监听
app.on('error', errorHandler)

// 启动服务
app.listen($consts['CONFIG/PORT'], () => {
  console.log('Koa服务启动成功, 端口: ', $consts['CONFIG/PORT'])
})