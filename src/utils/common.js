const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const $consts = require('@src/constants');

/**
 * 发射异常
 * @param {context} ctx 
 * @param {错误类型} type 
 * @returns 
 */
const errorEmitter = (ctx, type, payload) => {
  const error = new Error(type)
  return ctx.app.emit('error', error, ctx, payload);
}

/**
 * 删除文件
 * @param {文件/文件夹绝对路径} absPath 
 * @param {深度遍历删除} deepClear 
 * @returns 
 */
const clearFile = (absPath, deepClear = false) => {
  if (!path.isAbsolute(absPath)) return;
  absPath = absPath.split('\\').join('/')
  const isFile = fs.lstatSync(absPath).isFile()
  if (isFile) {
    fs.unlinkSync(absPath)
    return true
  } else {
    const files = fs.readdirSync(absPath)
    files.forEach(file => {
      const path = `${absPath}/${file}`
      if (deepClear) {
        clearFile(path)
      } else {
        const isFile = fs.lstatSync(path).isFile()
        if (isFile) fs.unlinkSync(path)
      }
    })
  }
  return true
}

/**
 * 将sql中的字段类型转换成seq中的类型（部分）
 * @param {sql中的type} type 
 * @param {字段长度} length 
 * @returns seq中对应的类型
 */
const transTableType = (type, length) => {
  switch (type.toLowerCase()) {
    case $consts['TABLE/TYPE_VARCHAR']:
      return length ? DataTypes.STRING(length) : DataTypes.STRING

    case $consts['TABLE/TYPE_INT']:
      return length ? DataTypes.INTEGER(length) : DataTypes.INTEGER

    case $consts['TABLE/TYPE_CHAR']:
      return length ? DataTypes.STRING(length) : DataTypes.STRING

    case $consts['TABLE/TYPE_BIGINT']:
      return length ? DataTypes.BIGINT(length) : DataTypes.BIGINT

    case $consts['TABLE/TYPE_TEXT']:
      return length ? DataTypes.TEXT(length) : DataTypes.TEXT

    case $consts['TABLE/TYPE_FLOAT']:
      return length ? DataTypes.FLOAT(length) : DataTypes.FLOAT

    default:
      return DataTypes.STRING
  }
}


module.exports = {
  errorEmitter,
  clearFile,
  transTableType,
}