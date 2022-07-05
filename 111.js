const sequelize = require('@src/db')
const initModels = require('@src/model/init-models')

const jane = await user.create({"firstName":"Jane","lastName":"Doe"});
console.log("Jane's auto-generated ID:", jane.id);
