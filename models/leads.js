/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leads', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.email,
      allowNull: false,
    },
  }, {
    tableName: 'leads',
    timestamps: true,
  });
};
