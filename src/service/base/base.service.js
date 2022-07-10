const { sequelize, Op } = require('@src/db')
const initModels = require('@src/model/init-models')
const $consts = require('@src/constants')

const Models = initModels(sequelize)

class BaseService {
  // 查询数据库中所有的表名
  static async getAllTablesName () {
    const [res] = await sequelize.query(`select table_name from information_schema.tables where table_schema='${$consts['CONFIG/DB_DATABASE']}';`)
    return res.map(item => item.TABLE_NAME)
  }

  // 单条数据插入  param: {...}
  static async create (modelName, param) {
    return await Models[modelName].create(param);
  }

  // 多条数据插入  paramsArr: [{},{}, ...]
  static async bulkCreate (modelName, paramsArr) {
    return await Models[modelName].bulkCreate(paramsArr);
  }

  // 查询整表
  static async findAll (modelName,) {
    return await Models[modelName].findAll({ raw: true });
  }

  // 根据某些字段查询  paramsArr: ['filedName1', ...]
  static async findAllByAttributes (modelName, paramsArr) {
    return await Models[modelName].findAll({ attributes: paramsArr });
  }

  // 排除某些字段查询  paramsArr: ['filedName1', ...]
  static async findAllByExclude (modelName, paramsArr) {
    return await Models[modelName].findAll({ attributes: { exclude: paramsArr }, raw: true });
  }

  // where and  paramsArr: [{filedName1: value1}, {filedName2: value2}, ...]
  static async findAllWhereAnd (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [Op.and]: [...paramsArr] }, raw: true });
  }

  // where or  paramsArr: [{filedName1: value1}, {filedName2: value2}, ...]
  static async findAllWhereOr (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [Op.or]: [...paramsArr] }, raw: true });
  }

  // where =  paramsArr: ['filedName1', value]
  static async findAllWhereEqual (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.eq]: paramsArr[1] } }, raw: true });
  }

  // where !=  paramsArr: ['filedName1', value]
  static async findAllWhereNotEqual (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.ne]: paramsArr[1] } }, raw: true });
  }

  // where 数字 >  paramsArr: ['filedName1', value]
  static async findAllWhereGreater (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.gt]: paramsArr[1] } }, raw: true });
  }

  // where 数字 >=  paramsArr: ['filedName1', value]
  static async findAllWhereGreaterEqual (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.gte]: paramsArr[1] } }, raw: true });
  }

  // where 数字 <  paramsArr: ['filedName1', value]
  static async findAllWhereLess (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.lt]: paramsArr[1] } }, raw: true });
  }

  // where 数字 <=  paramsArr: ['filedName', value]
  static async findAllWhereLessEqual (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.lte]: paramsArr[1] } }, raw: true });
  }

  // where between  paramsArr: ['filedName', [value1, value2]]
  static async findAllWhereBetween (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.between]: [...paramsArr[1]] } }, raw: true });
  }

  // where not between  paramsArr: ['filedName', [value1, value2]]
  static async findAllWhereNotBetween (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.notBetween]: [...paramsArr[1]] } }, raw: true });
  }

  // where in  paramsArr: ['filedName', [value1, value2]]
  static async findAllWhereIn (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.in]: [...paramsArr[1]] } }, raw: true });
  }

  // where not in  paramsArr: ['filedName1', [value1, value2]]
  static async findAllWhereNotIn (modelName, paramsArr) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.notIn]: [...paramsArr[1]] } }, raw: true });
  }

  // where like: %...%  param: 'str'
  static async findAllWhereLike (modelName, param) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.substring]: param } }, raw: true });
  }

  // where likeStart: ...%  param: 'str'
  static async findAllWhereLikeStart (modelName, param) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.startsWith]: param } }, raw: true });
  }

  // where likeEnd: ...%  param: 'str'
  static async findAllWhereLikeEnd (modelName, param) {
    return await Models[modelName].findAll({ where: { [paramsArr[0]]: { [Op.endsWith]: param } }, raw: true });
  }

  // update allRows by filedName1   param: {filedName1: value1, filedName2: value2, ...}
  static async updateAll (modelName, param) {
    return await Models[modelName].update(param, { where: {} });
  }

  // update where =   paramsArr: [{filedName1: value1, filedName2: value2, ...}, [filedName, value]]
  static async updateWhereEqual (modelName, paramsArr) {
    return await Models[modelName].update(paramsArr[0], { where: { [paramsArr[1][0]]: paramsArr[1][1] } });
  }

  // update where and   paramsArr: [{filedName1: value1, filedName2: value2, ...}, [{filedName1: value1}, {filedName2: value2}, ...]]
  static async updateWhereAnd (modelName, paramsArr) {
    return await Models[modelName].update(paramsArr[0], { where: { [Op.and]: paramsArr[1] } });
  }

  // update where or   paramsArr: [{filedName1: value1, filedName2: value2, ...}, [{filedName1: value1}, {filedName2: value2}, ...]]
  static async updateWhereOr (modelName, paramsArr) {
    return await Models[modelName].update(paramsArr[0], { where: { [Op.or]: paramsArr[1] } });
  }

  // destroy
  static async destroy (modelName) {
    return await Models[modelName].destroy({ truncate: true });
  }
}

module.exports = BaseService