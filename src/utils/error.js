const $consts = require('@src/plugins/consts')

/**
 * 异常处理, 注: 401请勿重复设置
 * @param error 异常
 * @param ctx Context
 * @param extra 额外参数
 */
const errorHandler = (error, ctx, extra) => {
  let IsSuccessfull = false, Data, Status
  switch (error.message) {
    case $consts['ERROR/UNAUTHORIZATION']:
      Data = { Message: 'Unauthorization' }
      Status = 401
      break

    default:
      Data = { Message: $consts['ERROR/NOT_FOUND'] }
      Status = 404
  }

  ctx.body = {
    IsSuccessfull,
    Data,
    Status
  }
}

/**
 * 发射异常, 交由koa实例处理, 由koa实例调用errorHandler
 * @param ctx Context
 * @param type 错误类型
 * @param extra 额外参数
 * @returns 
 */
const emitError = (ctx, type, extra) => {
  const error = new Error(type)
  return ctx.app.emit('error', error, ctx, extra)
}

module.exports = {
  errorHandler,
  emitError
}