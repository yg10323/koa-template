const fs = require('fs')
const $log = require('@src/plugins/log')

const moduleExp = {};
(() => {
  try {
    fs.readdirSync(__dirname).forEach(file => {
      if (file === 'index.js') return;
      const fileName = file.split('.')[0]
      moduleExp[fileName] = require(`./${file}`)
    })
  } catch (error) {
    $log['error'].error('引入const文件错误_', error)
  }
})()

module.exports = {
  ...moduleExp
}