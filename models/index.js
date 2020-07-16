
const {sequelize, DataTypes} = require('./../../config/db.postgres');
const UsersModel = require('./users')(sequelize, DataTypes);
const LeadsModel = require('./leads')(sequelize, DataTypes);

module.exports = {
  UsersModel,
  LeadsModel,
};
