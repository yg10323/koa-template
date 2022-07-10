const Router = require('koa-router')
const {
  baseDeal
} = require('@src/middleware/base/base.middleware')
const BaseController = require('@src/controller/base/base.controller')
const { baseControl } = new BaseController()

const baseRouter = new Router({ prefix: '/api/base' })


// 通过jsonConfig创建表
baseRouter.post('/createByJsonData', (ctx, next) => {
  console.log(ctx.request.body);

})
// 置于最底部
// baseRouter预置好的api全部默认为post类型，因为都需要指定moduleName
baseRouter.post('/:path', baseDeal, baseControl)


module.exports = baseRouter
