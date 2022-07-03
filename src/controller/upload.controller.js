const logger = require('@src/utils/log4');
const fs = require('fs');
const sequelize = require('@src/db')
const { Sequelize, DataTypes } = require('sequelize');

class UploadController {
  async createTableByExcel (ctx, next) {
    try {
      // console.log(ctx.tableName);
      // console.log(ctx.seqConfig);

      // console.log(User === sequelize.models.User);
      // console.log(User);
      // console.log(sequelize);
      try {
        // const User = sequelize.define(ctx.tableName, {
        //   firstName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        //   },
        //   lastName: {
        //     type: DataTypes.STRING
        //     // allowNull 默认为 true
        //   }
        // });
        // let modelName = ctx.tableName[0].toUpperCase() + ctx.tableName.slice(1);
        console.log(ctx.seqConfig);
        const User = sequelize.define(ctx.tableName, ctx.seqConfig);
        User.sync({ force: true }).then(() => {
          console.log('成功');
          process.exit() // 成功之后退出，否则会一直在后台运行
        }) //执行并写入数据库，force是如果数据库中有user表，则删除，重新写入数据。

      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    } catch (error) {
      logger.error('UploadController_createTableByExcel_', error);
    }
  }
}

module.exports = new UploadController()
