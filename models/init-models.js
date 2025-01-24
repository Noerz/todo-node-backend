var DataTypes = require("sequelize").DataTypes;
var _task = require("./task");
var _user = require("./user");

function initModels(sequelize) {
  var task = _task(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  task.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(task, { as: "tasks", foreignKey: "user_id"});

  return {
    task,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
