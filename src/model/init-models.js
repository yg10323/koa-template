var DataTypes = require("sequelize").DataTypes;
var _seller = require("./seller");
var _user = require("./user");

function initModels(sequelize) {
  var seller = _seller(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    seller,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
