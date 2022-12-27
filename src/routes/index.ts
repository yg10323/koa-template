import Koa from 'koa'
import fs from 'fs'
import { $log } from 'src/plugins'

const mapRoutes = (app: Koa) => {
  fs.readdirSync(__dirname).forEach((file: string) => {
    try {
      if (file === 'index.ts') return
      // export default 导出的模块需要使用 require().default 获取
      const router = require(`./${file}`).default
      app.use(router.routes())
      app.use(router.allowedMethods())
    } catch (error: any) {
      $log['error'].error('mapRoutes', error)
    }
  })
}

export default mapRoutes