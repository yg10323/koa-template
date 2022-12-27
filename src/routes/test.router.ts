import type { Context, Next } from 'src/types'
import Router from 'koa-router'

const testRouter = new Router({ prefix: '/api/test' })

testRouter.get('/', (ctx: Context, next: Next) => {
  ctx.body = {
    IsSuccessfull: true,
    Data: 'This is a Get request',
    Status: 200,
    Total: 0,
    PageIndex: 1,
    PageSize: 0
  }
})

export default testRouter