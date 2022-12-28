import path from 'path'
import Koa from 'koa'
import cors from 'koa2-cors'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import mapRoutes from 'src/routes'
import { $consts } from 'src/plugins'
import { errorHandler } from 'src/utils/error'
import dbConfig from 'src/db'

const app = new Koa()

// 注册插件
mapRoutes(app)
app.use(cors({ origin: '*' }))
app.use(koaBody())
app.use(koaStatic(path.join(__dirname, 'static')))

// 初始化 models
dbConfig.generateModel()

// 事件监听
app.on('error', errorHandler)

app.listen($consts['CONFIG/PORT'], () => {
  console.log('koa服务已启动, 端口:', $consts['CONFIG/PORT'])
})