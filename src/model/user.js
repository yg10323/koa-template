const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      comment: "姓名"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "厦门"
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "\"19\""
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
