
const Router = require('koa-router')
const {
  expMiddle
} = require('@src/middleware/custom/seller.middleware')
const SellerController = require('@src/controller/custom/seller.controller')
const {
  insMethod
} = new SellerController()

const sellerRouter = new Router({ prefix: '/api/seller' })

sellerRouter.get('/test', expMiddle, insMethod)

module.exports = sellerRouter