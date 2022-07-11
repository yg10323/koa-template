// 初始化
const fs = require('fs');
const path = require('path');

(() => {
  // 创建必需的空目录
  const needCreatePath = ['controller', 'middleware', 'router', 'service', 'template']
  fs.readdirSync(__dirname).forEach(pathName => {
    const isFile = fs.lstatSync(path.join(__dirname, pathName)).isFile()
    if (isFile || !needCreatePath.includes(pathName)) return
    const files = fs.readdirSync(path.join(__dirname, pathName))
    !files.includes('custom' || 'extra') && fs.mkdirSync(path.join(__dirname, `${pathName}/custom`))
  })
  const files = fs.readdirSync(path.join(__dirname, '..'))
  !files.includes('public') && fs.mkdirSync(path.join(__dirname, '../public'))
})()