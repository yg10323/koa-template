const Router = require('koa-router')
const {
  uploadExcel,
  sheetDataToSeq
} = require('@src/middleware/upload.middleware')
const {
  createTableByExcel
} = require('@src/controller/upload.controller')

const uploadRouter = new Router({ prefix: '/api/upload' })


uploadRouter.post('/excel', uploadExcel, sheetDataToSeq, createTableByExcel)


module.exports = uploadRouter