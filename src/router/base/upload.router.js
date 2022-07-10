const Router = require('koa-router')
const {
  uploadExcel,
  sheetDataToSeq
} = require('@src/middleware/base/upload.middleware')
const {
  createTableByExcel,
  createTableByConfig
} = require('@src/controller/base/upload.controller')

const uploadRouter = new Router({ prefix: '/api/upload' })

// 通过exlce创建表
uploadRouter.post('/excel', uploadExcel, sheetDataToSeq, createTableByExcel)
// 通过jsonConfigData创建表
baseRouter.post('/createByJsonData', createTableByConfig)

module.exports = uploadRouter