var DataTypes = require("sequelize").DataTypes;
var _buyers = require("./buyers");
var _sellers = require("./sellers");
var _users = require("./users");

function initModels(sequelize) {
  var buyers = _buyers(sequelize, DataTypes);
  var sellers = _sellers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    buyers,
    sellers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
