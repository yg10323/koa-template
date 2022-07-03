const fs = require('fs');
const logger = require('@src/utils/log4')
// services下的文件名请勿设置为config.js
const config = require('@src/config')

const moduleExp = {};
(() => {
  try {
    fs.readdirSync(__dirname).forEach(file => {
      if (file === 'index.js') return;
      const fileName = file.split('.')[0]
      moduleExp[fileName] = require(`./${file}`)
    })
  } catch (error) {
    logger.error('引入const文件错误_', error)
  }
})()

module.exports = {
  ...moduleExp,
  config
}