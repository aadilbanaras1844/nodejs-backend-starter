
const {sequelize, DataTypes} = require('./../config/db');
const UsersModel = require('./users')(sequelize, DataTypes);
const LeadsModel = require('./leads')(sequelize, DataTypes);

const {helper} = require('./../config');

UsersModel.sync({force: false}).then(async function () {
  // Table created
  // return UsersModel.create({
  //   first_name: 'super',
  //   last_name: 'admin',
  //   username: 'super',
  //   is_super_admin: true,
  //   is_staff: false,
  //   password: await helper.encryptPassword('super')
  // });
});
LeadsModel.sync({force: false}).then(async function () {});

module.exports = {
  UsersModel,
  LeadsModel,
};
