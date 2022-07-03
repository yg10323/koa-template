// TODO
const { DataTypes } = require('sequelize');
const sequelize = require('@src/db')

const models = {};

const createTableByExcel = (name, seqConfig) => {
  const tableName = name[0].toUpperCase() + name.slice(1);
}


const ModelName = sequelize.define(tableName, seqConfig);
module.exports = ModelName

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});

module.exports = {
  ...models
}