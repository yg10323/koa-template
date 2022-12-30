const Router = require('koa-router')

const testRouter = new Router({ prefix: '/api/test' })

testRouter.get('/', (ctx, next) => {
  ctx.body = {
    IsSuccessfull: true,
    Data: 'This is a Get request -- JavaScript',
    Status: 200,
    Total: 0,
    PageIndex: 1,
    PageSize: 10
  }
})

module.exports = testRouter