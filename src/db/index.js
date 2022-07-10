const { Sequelize, Op } = require('sequelize');
const $consts = require('../constants')
const logger = require('../utils/log4')

// db的实例
class DBInstance {
  constructor () {
    // 存放sequelize连接
    // key为database + host + port, value为sequelize的实例
    this.sequelizeInstance = {}
  }

  // 单例模式
  static getInstance () {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance();
    }
    return DBInstance.instance;
  }

  // 返回sequelize的实例
  // this.sequelizeInstance 如果有就直接返回，否则new 一个新的实例，并把键值对加入this.sequelizeInstance中
  // 参数dbInfo 包括database、host、port、dbAccount、dbPassword
  getSequelizeInstance () {
    if (!$consts['CONFIG/DB_HOST'] || !$consts['CONFIG/DB_PORT'] || !$consts['CONFIG/DB_DATABASE']) {
      logger.error('数据库配置有误,请检查根目录下config文件中的数据库配置')
      return false;
    }
    const seqKey = '' + $consts['CONFIG/DB_DATABASE'] + $consts['CONFIG/DB_HOST'] + $consts['CONFIG/DB_PORT'];
    // 存在就返回
    if (this.sequelizeInstance[seqKey]) return this.sequelizeInstance[seqKey];
    // 不存在，先创建
    if (!$consts['CONFIG/DB_USER'] || !$consts['CONFIG/DB_PASSWORD']) {
      logger.error('数据库配置有误,缺少用户名或密码')
      return false;
    }
    this.sequelizeInstance[seqKey] = new Sequelize($consts['CONFIG/DB_DATABASE'], $consts['CONFIG/DB_USER'], $consts['CONFIG/DB_PASSWORD'], {
      host: $consts['CONFIG/DB_HOST'],
      dialect: $consts['CONFIG/DIALECT'],
      port: $consts['CONFIG/DB_PORT'],
      timezone: "+08:00", // 东八区时间
      logging: false, // 若想要终端打印执行的seq语句，请注释掉此行代码
    });
    return this.sequelizeInstance[seqKey];
  }
}

const seqInstance = DBInstance.getInstance();
module.exports = {
  Op,
  sequelize: seqInstance.getSequelizeInstance()
}