const fs = require('fs');

/**
 * 发射异常
 * @param {context} ctx 
 * @param {错误类型} type 
 * @returns 
 */
const errorEmitter = (ctx, type) => {
  const error = new Error(type)
  return ctx.app.emit('error', error, ctx);
}

/**
 * 删除文件/清空文件夹
 * @param {文件/文件夹绝对路径} path 
 * @returns 
 */
const clearFile = (absPath) => {
  const isFile = fs.lstatSync(absPath).isFile()
  if (isFile) {
    fs.unlinkSync(absPath)
    return true
  } else {
    const files = fs.readdirSync(absPath)
    console.log(files);
  }

}


module.exports = {
  errorEmitter,
  clearFile
}