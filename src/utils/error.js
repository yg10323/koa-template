const $consts = require('../constants')

// 异常处理方法
const errorHandler = (error, ctx) => {
  let IsSuccessfull, Data, MessageType;

  switch (error.message) {
    default:
      IsSuccessfull: false
      Data = 'NOT FOUND'
      MessageType = 404
  }

  // 返回状态码以及提示信息
  ctx.body = {
    IsSuccessfull,
    Data,
    MessageType
  }
}


module.exports = errorHandler