const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const { errorEmitter } = require('@src/utils/common')
const BaseService = require('@src/service/base.service')

class BaseController {
  constructor () {
    // console.log('父类构造函数执行: ');
  }

  static async baseControl (ctx, next) {
    try {
      const { modelName, paramsArr } = ctx.request.body
      const res = await BaseService.updateWhereEqual(modelName, paramsArr)
      console.log(res);
      console.log('baseControl');
    } catch (error) {
      logger.error('BaseController_baseControl_', error)
    }
  }

  // create => insert
  static async create (ctx, next) {
    console.log('create');
  }

  // read => get
  static async read (ctx, next) {
    console.log('read');
  }

  // update => update
  static async update (ctx, next) {
    console.log('update');
  }

  // delete => delete
  static async delete (ctx, next) {
    console.log('delete');
  }
}

module.exports = BaseController