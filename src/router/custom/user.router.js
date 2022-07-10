
const Router = require('koa-router')
const {
  expMiddle
} = require('@src/middleware/custom/user.middleware')
const UserController = require('@src/controller/custom/user.controller')
const {
  insMethod
} = new UserController()

const userRouter = new Router({ prefix: '/api/user' })

userRouter.get('/test', expMiddle, insMethod)

module.exports = userRouter