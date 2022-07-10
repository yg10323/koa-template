const fs = require('fs');
const path = require('path');
const logger = require('@src/utils/log4')

// 遍历当前目录,动态注册路由
const mapRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(pathName => {
    try {
      if (pathName === 'index.js') return;
      fs.readdirSync(path.join(__dirname, pathName)).forEach(file => {
        const router = require(`./${pathName}/${file}`);
        // 注册路由
        app.use(router.routes());
        app.use(router.allowedMethods());
      })
    } catch (error) {
      logger.error('匹配路由错误_', error)
    }
  })
}

module.exports = mapRoutes