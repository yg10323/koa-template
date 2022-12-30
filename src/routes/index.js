const fs = require('fs');
const $log = require('@src/plugins/log')

// 遍历当前目录,动态注册路由
const mapRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    try {
      if (file === 'index.js') return;
      const router = require(`./${file}`);
      // 注册路由
      app.use(router.routes());
      app.use(router.allowedMethods());
    } catch (error) {
      $log['error'].error('匹配路由错误_', error)
    }
  })
}

module.exports = mapRoutes