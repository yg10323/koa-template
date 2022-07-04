const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const sequelize = require('@src/db')
const SequelizeAuto = require('sequelize-auto');
const createUser = require('@src/service/test')

class UploadController {
  async createTableByExcel (ctx, next) {
    try {
      for (const [tableName, config] of Object.entries(ctx.seqConfig)) {
        console.log(tableName);
      }
      // TODO ctx的数据逻辑变了, controller重写
      // let modelName = ctx.tableName[0].toUpperCase() + ctx.tableName.slice(1);
      // modelName = sequelize.define(ctx.tableName, ctx.seqConfig);
      // //执行并写入数据库，{ force: true }如果存在,则删除
      // await modelName.sync()
      // const options = {
      //   host: $consts['CONFIG/DB_HOST'],
      //   dialect: $consts['CONFIG/DIALECT'],
      //   directory: './src/model',  // 指定输出 models 文件的目录
      //   port: $consts['CONFIG/DB_PORT'],
      //   // additional: {
      //   //   timestamps: false
      //   // }
      // }
      // const auto = new SequelizeAuto(sequelize, null, null, options);
      // auto.run(err => {
      //   if (err) console.log(err);
      // })

      // const user = await createUser()
      // console.log(user.id);
    } catch (error) {
      logger.error('UploadController_createTableByExcel_', error);
    }
  }
}

module.exports = new UploadController()
