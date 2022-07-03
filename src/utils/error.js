const $consts = require('../constants')

// 401请勿重复设置

// 异常处理方法
const errorHandler = (error, ctx) => {
  let IsSuccessfull = false, Data, MessageType;
  switch (error.message) {
    case $consts['ERROR/FILE_TYPE_ERROR']:
      Data = '文件类型错误'
      MessageType = 400
      break
    case $consts['ERROR/MAX_FILE_COUNT']:
      Data = '文件数量超出限制'
      MessageType = 400
      break

    case $consts['ERROR/SHEET_NAME_IS_WRONG']:
      Data = 'excel的sheet名称不符合要求'
      MessageType = 400
      break

    case $consts['ERROR/SHEET_DATA_IS_WRONG']:
      Data = 'excel的行数据填写不符合要求'
      MessageType = 400
      break
    case $consts['ERROR/PRIMARY_KEY_REPEAT']:
      Data = '主键重复'
      MessageType = 400
      break

    default:
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