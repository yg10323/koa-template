const $consts = require('../constants')

// 401请勿重复设置

// 异常处理方法
const errorHandler = (error, ctx, payload) => {
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
      Data = '单表主键重复, 主键数量请设置1或0个'
      MessageType = 400
      break

    case $consts['ERROR/CREATE_TABLE_BY_EXCEL']:
      Data = `${payload}创建出错, 请检查配置格式或查看server端日志文件`
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