const Router = require('koa-router')
const {
  uploadExcel,
  sheetDataToSeq
} = require('@src/middleware/upload.middleware')
const {
  createTableByExcel
} = require('@src/controller/upload.controller')

const uploadRouter = new Router({ prefix: '/api/upload' })

const UserController = require('@src/controller/user.controller')

uploadRouter.post('/excel', uploadExcel, sheetDataToSeq, createTableByExcel)
uploadRouter.post('/test', UserController.baseControl)

module.exports = uploadRouter