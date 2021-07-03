const sequelize = require('../utils/database');
const {DataTypes, Model} = require('sequelize');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  profile_picture_url: {
    type: DataTypes.TEXT,
    defaultValue: 'http://localhost:3000/api/img/default_avatar.jpg',
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  number_of_clics: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  clic_dps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  building_dps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'user'
});

module.exports = User;
