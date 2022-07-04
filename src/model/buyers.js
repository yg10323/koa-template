const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "账号"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "密码"
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "手机号"
    }
  }, {
    sequelize,
    tableName: 'buyers',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
