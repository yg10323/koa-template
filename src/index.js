const path = require('path');
require('./utils/alias')(path.join(__dirname, '..'), {
  src: path.join(__dirname, '.'),
});
const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const mapRoutes = require('./router')
const errorHandler = require('./utils/error')
const $consts = require('@src/constants')
const { clearFile } = require('@src/utils/common')
// 以下两行引入为测试时使用，记得删除
const { deleteTemplateCreate } = require('@src/script')
const BaseService = require('@src/service/base/base.service')

const app = new Koa()

// 注册插件
app.use(cors({ origin: '*' }))                               // 跨域处理
app.use(koaBody({                                            // 数据格式解析与图像上传
  multipart: true,                                           // 支持 multipart-formdate 的表单
  formidable: {
    uploadDir: path.join(__dirname, '../public'),            // 保存路径
    keepExtensions: true,                                    // 保持原文件后缀
    maxFieldsSize: 10 * 1024 * 1024,                          // 限制文件大小为10M
  }
}))
app.use(koaStatic(path.join(__dirname, '../public')))       // 静态资源服务器
// 注册路由
mapRoutes(app)
// 异常监听
app.on('error', errorHandler)
// 服务重启时删除public一级下所有文件，如需清空子目录，请设置第二个参数为 true
clearFile(path.join(__dirname, '../public'));

// 以下为测试时使用，记得删除
// (async () => {
//   deleteTemplateCreate(await BaseService.getAllTablesName())
// })()

app.listen($consts['CONFIG/SERVER_PORT'], () => {
  console.log(`Koa服务启动成功, 端口: ${$consts['CONFIG/SERVER_PORT']}`);
})