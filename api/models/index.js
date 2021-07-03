const User = require('./User');
const Building = require('./Building');

Building.belongsToMany(User, {
  as: 'users',
  through: 'user_has_building',
  foreignKey: 'building_id',
  otherKey: 'user_id',
  onDelete: 'cascade'
});

User.belongsToMany(Building, {
  as: 'buildings',
  through: 'user_has_building',
  foreignKey: 'user_id',
  otherKey: 'building_id',
  onDelete: 'cascade'
});

module.exports = {
  User,
  Building
}