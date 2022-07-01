const Router = require('koa-router')
const {
  uploadExcel
} = require('@src/middleware/upload.middleware')

const uploadRouter = new Router({ prefix: '/api/upload' })


uploadRouter.post('/excel', uploadExcel)


module.exports = uploadRouter