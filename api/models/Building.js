const sequelize = require('../utils/database');
const {DataTypes, Model} = require('sequelize');

class Building extends Model {}

Building.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cost_factor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  upgrade_factor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  default_cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  default_value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_storage_building: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
  }
}, {
  sequelize,
  tableName: 'building'
});

module.exports = Building;
